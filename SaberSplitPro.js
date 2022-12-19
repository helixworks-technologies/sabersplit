const readline = require('readline');
const fs = require('fs');
var math = require('./mathjs');
//var skewness = require('compute-skewness');
//var kurtosis = require('compute-kurtosis');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Input filename with destination - ", function(i_file) {
    rl.question("Output filename with destination - ", function(o_file) {
        console.log(`${i_file}, is the given input, writing file to ${o_file}`);
        const writeInterface = fs.createWriteStream(o_file);
        const readInterface = readline.createInterface({
            input: fs.createReadStream(i_file),
            //output: process.stdout,
            console: false
        });
        writeInterface.write("SaberSplitPro");
        readInterface.on('line', function(line) {
            var cache_buffer = new Array;
            var hold_buffer = new Array;
            var score;
            var start = 0;
            var hit = "0";
            var med;
            var tmp;
            var arr_mad;
            var result = "";
            var f_gate = 0;
            cache_buffer = line.split('\t');
            var size = cache_buffer[2]-1;
            var r_name = cache_buffer[1];
            cache_buffer.splice(0,4);
            arr_mad = math.mad(cache_buffer);
            med = math.median(cache_buffer);
            //console.log(cache_buffer[0]);
            //console.log(cache_buffer[size]);
            for (var g = 0; g < size+1; g++) {
                score = (cache_buffer[g]-med)/arr_mad;
                if (score > 5) {
                    hold_buffer = [];
                    hold_buffer.push(cache_buffer[g]);
                    tmp = g-1;
                    do {
                        hold_buffer.unshift(cache_buffer[tmp]);
                        tmp -= 1;
                    } while (((cache_buffer[tmp]-med)/arr_mad) > 3);
                    tmp = g+1;
                    do {
                        hold_buffer.push(cache_buffer[tmp]);
                        tmp += 1;
                    } while (((cache_buffer[tmp]-med)/arr_mad) > 3);
                    
                    //console.log(r_name);
                    //console.log(g);
                    //console.log(cache_buffer[g]);
                    //console.log(hold_buffer[0]);
                    //console.log(hold_buffer.length);
                    //console.log(hold_buffer[(hold_buffer.length-1)]);
                    //console.log(kurtosis(hold_buffer));
                    //console.log(skewness(hold_buffer));                    
                    //console.log(hold_buffer);
                    //hold_buffer = cache_buffer.slice(g-10, g+10);
                    //kurtosis(hold_buffer) > 0
                    if (hold_buffer.length < 12) {
                        if (hit != "0") {
                            result += "\n"+r_name+"_"+start+"-"+g+hit;
                            f_gate = 0;
                            hit = "0";
                            //console.log("Hit");  
                            //console.log(r_name);
                            //console.log(g);
                            //console.log(cache_buffer[g]);
                            //console.log("Sharpness");
                            //console.log(hold_buffer);
                            //console.log(hold_buffer[0]);
                            //console.log(hold_buffer.length);
                            //console.log(hold_buffer[(hold_buffer.length-1)]);
                            //console.log(kurtosis(hold_buffer));
                            //console.log(skewness(hold_buffer));
                        }
                    }
                }
                else if (f_gate == 1) {
                    hit += "\t"+cache_buffer[g];
                }
                else {
                    start = g;
                    hit = "\t"+cache_buffer[g];
                    f_gate = 1;
                }
            }
            if (f_gate == 1) {
                result += "\n"+r_name+"_"+start+"-"+(g-1)+hit;
            }
            writeInterface.write(result);
        });
        rl.close();
    });
});