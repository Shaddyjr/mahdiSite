document.addEventListener("DOMContentLoaded",function(){
    const lines = [
        'Person {',
        'name : \"Mahdi Shadkam-Farrokhi\",',
        'img : \"assets/mahdi.jpg\"',
        'skills : [',
        '\"SQL\",',
        '\"CSS\",',
        '\"HTML\",',
        '\"JavaScript\"',
        '],',
        'education : [',
        'School {',
        'name : "NYU",',
        'graduated : 2013,',
        'degree : "Masters in Biology"',
        '}',
        ']',
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
                div.classList.add(`indent-${indentCount}`);
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
                    tempStr.push(part);
                    if(part.match('\"[,]?$')){
                        part = tempStr.join(" ");
                        attachment.className = "orange";
                    }else{
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
        element.style.display = "initial";
        initial.classList.add("cursor");
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
    }

    typePage();
})