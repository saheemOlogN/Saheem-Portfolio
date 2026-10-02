import * as icons from 'simple-icons';
import {writeFileSync} from 'node:fs';
const slugs=['react','tailwindcss','bootstrap','shadcnui','ejs','html5','nodedotjs','express','php','mongodb','mysql','javascript','c','cplusplus','openjdk','python','pytorch','huggingface','numpy','pandas','git','github','postman','linux'];
for(const slug of slugs){const icon=Object.values(icons).find(i=>i.slug===slug);if(icon)writeFileSync(`public/icons/${slug}.svg`,icon.svg.replace('<svg ', '<svg fill="#c7d4ce" '));else console.log('Missing',slug)}
