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
        for(const line of lines){
            const div = document.createElement("div");
            div.className = "line";
            const parts = line.split(" ");
            for(let part of parts){
                let attachment = document.createElement("p");

                // plain syntax characters
                if(part.match("^[:;,{}\\[\\]]$")){
                    attachment.className = "plain"
                }else{
                    attachment.className = "purple"
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
})