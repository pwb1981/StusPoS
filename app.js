const fs = require('fs');

const inputFile = 'in/in.csv';                              // constants
const outputFile = 'out.csv';

var itemCounts = {};                                        // create empty object to act as dictionary
var output = '';                                            // instantiate string variable to write output to


fs.readFile(inputFile, 'utf8', (err, data) => {             // read input file
    if (err) throw err;

    data.split(/\r?\n/).forEach(line => {                   // split file into lines
        if (line != 'Items') {                              // ignore header 'Items'
            line.split(',').forEach(item => {               // split each line into items
                const parts = item.split(' x ');            // split each item into name & count
                const name = `${parts[1]}`;
                const count = parseInt(parts[0]);

                if (!itemCounts[name])
                    itemCounts[name] = 0                    // create dictionary item if does not exist

                itemCounts[name] += count;                  // add item count to total
            });
        }
    });

    itemCounts = Object.keys(itemCounts).sort().reduce(     // sort items by name
        (obj, key) => { 
            obj[key] = itemCounts[key]; 
            return obj;
        },{});

    for(var key in itemCounts) {
        output += (`${key},${itemCounts[key]}\n`);
    }

    fs.writeFile(outputFile, output, err => {                // write output to file
        if (err) throw err;
    });
});
