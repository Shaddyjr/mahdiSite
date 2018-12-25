document.addEventListener("DOMContentLoaded",function(){
    const lines = [
        'Person {',
        'name : "Mahdi Shadkam-Farrokhi",',
        'interests : [',
        '"Web Development",',
        '"Android Development",',
        '"Instructional Design"',
        '],',
        'projects : [',
        '"All Star Code Apply Page!https://allstarcodeorg.github.io/apply2019/",',
        '"2018 ASC Curriculum and website!https://allstarcodeorg.github.io/2018_summer_site/",',
        '"ASC Readathon Application!https://2019-readathon.glitch.me/"',
        '],',
        'social : {',
        'linkedin : "mahdi-shadkamfarrokhi!https://www.linkedin.com/in/mahdi-shadkamfarrokhi-8a410958/",',
        'github_1 : "mahdiASC!https://github.com/mahdiASC",',
        'github_2 : "Shaddyjr!https://github.com/Shaddyjr",',
        'twitter : "@Shaddymaze!https://twitter.com/Shaddymaze"',
        '},',
        'contact : "mahdis.pw!mailto:mahdis.pw@gmail.com"',
        '}'
    ]

    function createComma(){
        const p = document.createElement("p");
        p.className = "comma";
        p.innerText = ",";
        return p;
    }

    function parseLines(lines){
        const container = document.querySelector(".object-container");
        
        let indentCount = 0;
        for(const line of lines){
            const div = document.createElement("div");
            div.className = "line";
            
            // tracking indent
            if(line.match("[{\\[]$")){
                if(indentCount>0){
                    div.classList.add(`indent-${indentCount}`);
                }
                indentCount++;
            }else if(line.match("[}\\]][,]?$")){
                indentCount--;
                if(indentCount>0){
                    div.classList.add(`indent-${indentCount}`);
                }
            }else if(indentCount>0){
                div.classList.add(`indent-${indentCount}`);
            }
            const parts = line.split(" ");

            // tracking continuous strings
            let tempStr = [];
            for(let part of parts){
                let attachment = document.createElement("p");
                if(part.match("^[:;,{}\\[\\]][,]?$")){
                    // plain syntax characters
                    attachment.className = "plain"
                }else if(part.match('\"') || tempStr.length>0){
                    // strings
                    if(part.match('\"[,]?$')){
                        const mark = part.indexOf("!");
                        if(mark>0){
                            const link = part.slice(mark,part.lastIndexOf('\"'));
                            tempStr.push(part.replace(link, ""));
                            attachment = document.createElement("a");
                            attachment.href = link.slice(1);
                            part = tempStr.join(" ");
                            attachment.className = "orange";
                        }else{
                            tempStr.push(part);
                            part = tempStr.join(" ");
                            attachment.className = "orange";
                        }
                    }else{
                        tempStr.push(part);
                        continue;
                    }
                }else if(part.match("^[A-Z]")){
                    // class name
                    attachment.className = "purple";
                }else if(!isNaN(part.replace(",",""))){
                    // number
                    attachment.className = "green";
                }else{
                    attachment.className = "blue";
                }

                // handles ending commas
                if(part.match(",$")){
                    attachment.innerText = part.slice(0,part.length-1);
                    div.appendChild(attachment);
                    div.appendChild(createComma());                    
                }else{
                    attachment.innerText = part;
                    div.appendChild(attachment);
                }
            }
            container.appendChild(div);
        }
    }

    parseLines(lines);

    async function typeText(element, time){
        time = time || 350;
        const str = element.textContent;
        element.textContent = "";
        element.style.display = "inline";
        element.classList.add("cursor");
        let i = 0;
        while(i < str.length){
            await new Promise((res)=>{
                setTimeout(
                    ()=>{
                            element.textContent += str[i++];
                            res();
                        }
                    , time
                )
            });
        }
    }

    async function removeText(element, time){
        time = time || 350;
        element.style.display = "inline";
        element.classList.add("cursor");
        let i = element.textContent.length;
        while(i > 0){
            await new Promise((res)=>{
                setTimeout(
                    ()=>{
                            element.textContent = element.textContent.slice(0,i--);
                            res();
                        }
                    , time
                )
            });
        }
    }

    async function changingClassName(){
        const classNameElement = document.querySelector(".line:first-child p:first-child");
        classNameElement.classList.add("cursor");
        await new Promise((res)=>setTimeout(()=>res(),1000));

        const names = ["Developer","Creator","Teacher"];
        let i = 0;
        await new Promise((res)=>{
            setInterval(()=>{
                removeText(classNameElement,200).then(()=>{
                    classNameElement.innerText = names[i++];
                    typeText(classNameElement,200);
                    if(i>=names.length) i = 0;
                    res();
                });
            }, 7000);
        })

    }

    async function typePage(){
        await typeText(initial);
        await new Promise((res)=>setTimeout(()=>res(),3000));
        initial.classList.remove("cursor");
        initial.style.display = "none";
        const lineDivs = document.getElementsByClassName("object-container")[0].children;
        for(const div of lineDivs){
            const ps = div.children;
            for(const p of ps){
                await typeText(p, 10);
                p.classList.remove("cursor");
            }
        }
        changingClassName();
    }

    typePage();
    // setting all <a> tag targets to "_blank"
    Array.from(document.getElementsByTagName("a")).forEach(x=>{if(!x.href.match("mailto"))x.target="_blank"});
})