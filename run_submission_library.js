const fs = require('fs');
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const library = require('./submitlibrary.json');

const user = eventPayload.sender.login;
const [title, description, authors, link, version, tags, post] = Object.values(library);

var content = `---
title: ${title}
description: ${description}
link: ${link}
version: ${version}`;

content += "\ntags:\n";

var _tags = "${tags}".split(",");

for (var entry in _tags) {
	content += "  - " + entry +"\n";
}

content += "\authors:\n";

var _authors = "${authors}".split(",");

for (var entry in _authors) {
	content += "  - " + entry + "\n";
}

content += "---\n";

content += "${post}";


if (fs.existsSync("./libs")) {
	if (!fs.existsSync("./libs/${user}")) {
		fs.mkdirSync("./libs/${user}");
	}
	
	fs.stat("./libs/${user}/${title}.md", function(err, stat) {
		if(err == null) {
			console.log('File exists');
		} else if(err.code === 'ENOENT') {
			// file does not exist
			fs.writeFileSync("./libs/${user}/${title}.md", content);
		} else {
			console.log('Some other error: ', err.code);
		}
	});
}
