const fs = require('fs');
const path = require('path');

const directories = [
    path.join(__dirname, 'components'),
    path.join(__dirname, 'app')
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Find all className="..." or className={'...'} 
    // We'll use a regex that handles both className="..." and className={'...'}
    // But to be safe, we can just replace within the file where we find hover:, cursor-pointer, or button elements.

    // A simpler approach: regex replace for className="[^"]*" and className={'[^']*'}
    // We will add " transition-all duration-300 ease-in-out" to classes that have hover: or cursor-pointer, 
    // and aren't already containing "duration-" or "transition-"

    content = content.replace(/className=(["'])(.*?)\1|className=\{(`)(.*?)\3\}/g, (match, q1, c1, q2, c2) => {
        let quote = q1 || q2;
        let cls = c1 !== undefined ? c1 : c2;
        let prefix = q1 ? `className=${quote}` : 'className={`';
        let suffix = q1 ? quote : '`}';

        if ((cls.includes('hover:') || cls.includes('cursor-pointer') || cls.includes('group-hover:')) &&
            !(cls.includes('duration-300') && cls.includes('transition-all'))) {

            // Remove any existing transition classes that might conflict, or just append it if not present
            if (!cls.includes('transition-')) {
                cls += ' transition-all duration-300 ease-in-out';
            } else {
                if (!cls.includes('duration-')) {
                    cls += ' duration-300 ease-in-out';
                }
                // if it has transition-colors but we want smooth, we can leave it or replace it.
                if (cls.includes('transition-colors') && !cls.includes('duration-')) {
                    cls += ' duration-300 ease-in-out';
                }
            }
        }

        return `${prefix}${cls}${suffix}`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            processFile(fullPath);
        }
    }
}

directories.forEach(dir => traverseDir(dir));
