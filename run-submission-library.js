const fs = require('fs');
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const library = require('./submitlibrary.json');

const user = eventPayload.sender.login;
const [title, description, authors.split(","), link, version, tags.split(","), post] = Object.values(library);

var content = @"---
title: ${title}
description: ${description}
link: ${link}
version: ${verison}";

content += "\ntags:\n";

for (var entry in ${tags}) {
	content += "  - ${tags[entry]}\n";
}

content += "\authors:\n";

for (var entry in ${authors}) {
	content += "  - ${authors[entry]}\n";
}

content += "---\n";

content += "${post}";



if !(fs.existsSync("./libs/${user}/${title}.md")) {
  fs.writeFileSync("./libs/${user}/${title}.md", content);
}


