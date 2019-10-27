document.addEventListener("DOMContentLoaded", function () {
    const initialText = "mahdi;";
    const lines = [
        'Person {',
        'name : "Mahdi Shadkam-Farrokhi, M.S.",',
        'interests : [',
        '"Data Science",',
        '"Web Development",',
        '"Tech Education"',
        '],',
        'projects : [',
        '"Bee Image Classifier!https://github.com/Shaddyjr/bee-image-classifier",',
        '"Using Yelp \'$\' price to predict affluence!https://github.com/Shaddyjr/predicting_affluence_using_yelp",',
        '"Predicting Housing Sale Price!https://github.com/Shaddyjr/predicting_housing_salePrice/blob/master/project_2_notebook_final.ipynb",',
        '"All Star Code Apply Page!https://allstarcodeorg.github.io/apply2019/"',
        '],',
        'social : {',
        'linkedin : "mahdi-shadkam-farrokhi!https://www.linkedin.com/in/mahdi-shadkam-farrokhi-8a410958/",',
        'github : "Shaddyjr!https://github.com/Shaddyjr",',
        'medium : "@mahdis.pw!https://medium.com/@mahdis.pw",',
        'youtube : "Glitched Failure!https://www.youtube.com/channel/UCErSNiDZV4rJCNB8NrDGREA",',
        'twitter : "@Shaddymaze!https://twitter.com/Shaddymaze"',
        '},',
        'contact : "mahdis.pw!mailto:mahdis.pw@gmail.com"',
        '}'
    ];
    const names = ["Developer", "Creator", "Teacher"];

    const INITIAL_CONTAINER_ID = "initial";
    const CURSOR_CLASSNAME = "cursor";
    const CONTAINER_CLASSNAME = "object-container";
    const COMMA_CLASSNAME = "comma";
    const TEXT_COLOR_CLASSNAMES = {
        "syntax": "plain",
        "string": "orange",
        "className": "purple",
        "number": "green",
        "misc": "blue"
    }

    const TRANSITION_DELAY = 5000;
    const SPEED_TYPE_DELAY = 10;
    let completedTypingAll = false;

    const INDENT_TRACKING_PREFIX = "indent-";
    const LINK_DELIMITER = "!";

    /**
     * Creates a <p> tag with a comma.
     */
    function createComma() {
        const p = document.createElement("p");
        p.className = COMMA_CLASSNAME;
        p.innerText = ",";
        return p;
    }

    /**
     * Creates an <a> tag with the given href.
     */
    function createLink(href) {
        const a = document.createElement("a");
        a.href = href;
        return a;
    }

    /**
     * Parses the given array of lines to IDE styled text.
     */
    function parseLines(lines) {
        const container = document.getElementsByClassName(CONTAINER_CLASSNAME)[0];

        let indentCount = 0;

        function handleDivIndent(div) {
            if (indentCount > 0) div.classList.add(`${INDENT_TRACKING_PREFIX}${indentCount}`)
        }
        for (const line of lines) {
            const div = document.createElement("div");
            div.className = "line";

            // tracking indent
            if (line.match("[{\\[]$")) {
                handleDivIndent(div);
                indentCount++;
            } else if (line.match("[}\\]][,]?$")) {
                indentCount--;
                handleDivIndent(div);
            } else {
                handleDivIndent(div);
            }
            const parts = line.split(" ");

            let tempStr = []; // tracking continuous string components
            for (let part of parts) {
                let attachment = document.createElement("p");
                if (part.match("^[:;,{}\\[\\]][,]?$")) {
                    // plain syntax characters
                    attachment.className = TEXT_COLOR_CLASSNAMES.syntax;
                } else if (part.match('\"') || tempStr.length > 0) {
                    // strings
                    if (part.match('\"[,]?$')) {
                        const mark = part.indexOf(LINK_DELIMITER);
                        if (mark > 0) {
                            const link = part.slice(mark, part.lastIndexOf('\"'));
                            tempStr.push(part.replace(link, ""));
                            attachment = createLink(link.slice(1));
                        } else {
                            tempStr.push(part);
                        }
                        part = tempStr.join(" ");
                        attachment.className = TEXT_COLOR_CLASSNAMES.string;
                    } else {
                        tempStr.push(part);
                        continue; // not finished assembling string components
                    }
                } else if (part.match("^[A-Z]")) {
                    // class name
                    attachment.className = TEXT_COLOR_CLASSNAMES.className;
                } else if (!isNaN(part.replace(",", ""))) {
                    // number
                    attachment.className = TEXT_COLOR_CLASSNAMES.number;
                } else {
                    attachment.className = TEXT_COLOR_CLASSNAMES.misc;
                }

                // handles ending commas
                if (part.match(",$")) {
                    attachment.innerText = part.slice(0, part.length - 1);
                    div.appendChild(attachment);
                    div.appendChild(createComma());
                } else {
                    attachment.innerText = part;
                    div.appendChild(attachment);
                }
            }
            container.appendChild(div);
        }
    }

    /**
     * Slowly types each character in the given element.
     */
    async function typeText(element, text, time) {
        const str = text || element.textContent;
        time = time || 350;
        element.textContent = "";
        element.style.display = "inline";
        element.classList.add(CURSOR_CLASSNAME);
        let i = 0;
        while (i < str.length) {
            await delayedTask(() => element.textContent += str[i++], time);
        }
    }

    /**
     * Helper function for delaying code execution.
     */
    function delayedTask(fn, time) {
        return new Promise((res) => {
            setTimeout(() => {
                if (fn) fn();
                res();
            }, time)
        });
    }

    /**
     * Slowly "deletes" each character in the given element.
     */
    async function removeText(element, time) {
        time = time || 350;
        element.style.display = "inline";
        element.classList.add(CURSOR_CLASSNAME);
        let i = element.textContent.length;
        while (i > 0) {
            await delayedTask(() => element.textContent = element.textContent.slice(0, i--), time);
        }
    }

    /**
     * Continuously changes the text in the given element to next string in given array.
     */
    async function changingClassName(element, arr) {
        element.classList.add(CURSOR_CLASSNAME);
        let i = 0;

        const nextString = () => {
            removeText(element, 200)
                .then(() => {
                    element.innerText = arr[i++];
                    typeText(element, null, 200);
                    if (i >= arr.length) i = 0;
                    setTimeout(nextString, TRANSITION_DELAY);
                });
        }
        nextString();
    }

    function beginClassName(){
        const classNameElement = document.querySelector(".line:first-child p:first-child");
        changingClassName(classNameElement, names);
    }

    function removeCursorFromElement(el){
        el.classList.remove(CURSOR_CLASSNAME);
        el.style.display = "none";
    }

    async function beginInitial(initial){
        await typeText(initial, initialText);
        await delayedTask(null, 2000);
        removeCursorFromElement(initial);   
    }

    /**
     * "Types" all content.
     */
    async function typeAll(type_speed){
        if(completedTypingAll) return;
        completedTypingAll = true;
        const lineDivs = document.getElementsByClassName(CONTAINER_CLASSNAME)[0].children;
        for (const div of lineDivs) {
            const ps = div.children;
            for (const p of ps) {
                if(type_speed <= 0){
                    p.style.display = "inline";
                }else{
                    await typeText(p, null, type_speed);
                }
                p.classList.remove(CURSOR_CLASSNAME);
            }
        }

        beginClassName();
    }
    
    /**
     * Main code that sets up the website.
     */
    async function setupPage() {
        parseLines(lines);
        const initial = document.getElementById(INITIAL_CONTAINER_ID);
        const quickDisplay = function(){
            removeCursorFromElement(initial);
            typeAll(0);
            document.removeEventListener("keypress", quickDisplay);
            document.removeEventListener("click", quickDisplay);
        }

        // Reveal all text quickly upon key press or mouseclick.
        document.addEventListener("keypress", quickDisplay);
        document.addEventListener("click", quickDisplay);
        
        await beginInitial(initial);
        typeAll(SPEED_TYPE_DELAY);
        
        // cleanup
        document.removeEventListener("keypress", quickDisplay);
        document.removeEventListener("click", quickDisplay);
    }
    
    // setting all <a> tag targets to "_blank" (if not an email link)
    Array.from(document.getElementsByTagName("a")).forEach(x => {
        if (!x.href.match("mailto")) x.target = "_blank"
    });

    setupPage();
})
