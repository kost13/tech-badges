const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const d3 = require('d3');
const fs = require('fs');
const pixelWidth = require('string-pixel-width');

const { readYml, preprocessGithubLanguagesFile } = require('./utils');
const configPaths = require('./config_files_paths.json');


function generateSvg(tag, name, color, outputDirectory) {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);    
    
    const txtWidth = pixelWidth(name, { font: 'arial', size: 14 });
    
    let body = d3.select(dom.window.document.querySelector("body"));
    let svg = body.append('svg').attr('width', txtWidth + 13).attr('height', 30).attr('xmlns', 'http://www.w3.org/2000/svg');
    
    svg.append("rect")
        .attr("x", 0).attr("rx", 6)
        .attr("y", 0).attr("ry", 6)
        .attr("width", "100%")
        .attr("height", "100%")
        .style("fill", color);
    
    svg.append("text")
        .attr("x", 6)
        .attr("y", 20)
        .attr("font-size", 14)
        .attr("fill", "#fff")
        .attr("font-family", "Arial")
        .text(name);
    
    fs.writeFileSync(`${outputDirectory}/tb_${tag}.svg`, body.html());
}

function generateAllSvgs(outputDirectory) {
    for (const config of configPaths) {
        let content;
        if (config.name === 'GitHub Languages') {
            content = preprocessGithubLanguagesFile(config.path);
        } else {
            content = readYml(config.path);
        }
        for (const tag in content) {
            generateSvg(tag, content[tag].name, content[tag].color, outputDirectory);
        }
    }
}

if (require.main === module) {
    generateAllSvgs('../dist/svgs');
}