# SabersSplit

SaberSplit is a node.js based tool to split fast5 reads that were incorrectly segemented. The script takes.TSV files generated from the SquigglePull program of the SquiggleKit ([https://github.com/Psy-Fer/SquiggleKit](https://github.com/Psy-Fer/SquiggleKit)) as input. SquigglePull TSV files contain the read-ID’s and their event level data.

SaberSplit script detects the spike regions that are associated with a read start or end, the spike regions traditionally have a high deviation value from the rest of the read. The script then crawls through the read to split at the spike regions using the MAD (Mean Absolute Deviation) value. SaberSplit extracts the event data from the input TSV files and stores them in an array. 

It calculates the median and MAD (Median Absolute Deviation) of the event data. It calculates (Datai-Median)/MAD for each of the data points and if the (Datai-Median)/MAD > 5. It takes that data point for further processing. SaberSplit extracts the events on the right-hand and left-hand side of the triggered event if they have (Datai-Median)/MAD > 3. If the total number of extracted events that are on the left and right along with the triggered event is less than 12 events. The event is classified as a spike and the read is split. 

Multiple .tsv files can be generated from a single original .tsv file based on the number of detected spike signals. The generated .tsv files must be repacked into fast5 files for basecalling.


## Prerequisites

- Node.js (Download and install from [nodejs.org](https://nodejs.org/))
- SquigglePull TSV files

## To run the provided script, you can follow these steps:

1. **Open a Terminal or Command Prompt**: Navigate to the directory where your script is located.

2. **Run the Script**: If your script is saved as `sabersplitpro.js`, you would run:

   ```bash
   node sabersplitpro.js
   ```

3. **Follow the Prompts**: The script will ask you for the input filename with destination, and then the output filename with destination. Provide the full paths to the files.

4. **Check the Output**: The script will process the input file and write the results to the output file.
