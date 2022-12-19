# SabersSplit

SaberSplit is a node.js based tool to process the .TSV files generated from the SquigglePull program of the SquiggleKit ([https://github.com/Psy-Fer/SquiggleKit](https://github.com/Psy-Fer/SquiggleKit)). SquigglePull TSV files contain the read-ID’s and their event level data in the following format. SaberSplit extracts the event data from the TSV files and stores them in an array. It calculates the median and MAD (Median Absolute Deviation) of the event data. It calculates (Datai-Median)/MAD for each of the data points and if the (Datai-Median)/MAD > 5. It takes that data point for further processing.

SaberSplit extracts the events on the right-hand and left-hand side of the triggered event if they have (Datai-Median)/MAD > 3. If the total number of extracted events that are on the left and right along with the triggered event is less than 12 events. The event is classified as a spike and the read is split. 
