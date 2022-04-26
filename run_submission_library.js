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
	content += "  - " + _tags[entry] +"\n";
}

content += "\authors:\n";

var _authors = "${authors}".split(",");

for (var entry in _authors) {
	content += "  - " + _authors[entry] + "\n";
}

content += "---\n\n";

content += "${post}";


if (!fs.existsSync("./libs")) {
	fs.mkdirSync("./libs");
}

if (!fs.existsSync("./libs/" + user)) {
	fs.mkdirSync("./libs/" + "user);
}

var path = "./libs/" + user + "/" + title + ".md";
fs.stat(path, function(err, stat) {
	if(err == null) {
		console.log('File exists ' + path);
	} else if(err.code === 'ENOENT') {
		// file does not exist
		fs.writeFileSync(path, content);
	} else {
		console.log('Some other error: ', err.code);
	}
});

fs.unlinkSync("submitlibrary.json")