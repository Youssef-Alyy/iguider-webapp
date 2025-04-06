'use server'
import fs from 'fs';


async function getReports() {
    // Get the data from the JSON files
    const data = await fs.promises.readFile('src/data/reports.json', 'utf-8');
    const jsonData = JSON.parse(data);

    const paragraphs = jsonData.paragraphs;
  
    const calls = jsonData.calls;

    const links = jsonData.links;

    // Create a map for easy access to call content by uuid
    const callsMap = calls.reduce((map, call) => {
        map[call.uuid] = call.content;
        return map;
    }, {});

    // Create a map of calls linked to each paragraph
    const linksMap = links.reduce((map, link) => {
        if (!map[link.paragraph]) {
            map[link.paragraph] = [];
        }
        link.calls.forEach(callUuid => {
            if (callsMap[callUuid]) {
                map[link.paragraph].push(callsMap[callUuid]);
            }
        });
        return map;
    }, {});

    // Add the calls to the corresponding paragraphs
    return paragraphs.map(paragraph => {
        return {
            ...paragraph,
            calls: linksMap[paragraph.uuid] || []
        };
    });
}


export default getReports;