let vars = {}
let counter = 1
let allowed = true

run = id => {
    let lines = []
    let code = document.getElementById(id).value
    let line = ""
    for (const iterator of code) {
        if (iterator == "\n") {
            lines.push(line)
            line = ""
        } else {line += iterator}
    }
    lines.push(line)
    for (const iterator of lines) {
        interpret(iterator)
    }
}

interpret = code => {
    let msg = ""

    if (allowed) {
        if ((code.includes("=") == true) && (code.includes("?") == false)) {
            let status = "varName"
            let varName = ""
            let varVal = ""
            for (const iterator of code) {
                if (iterator == "|") {break}
                if (iterator != "=") {
                    if (status == "varName") {
                        varName += iterator
                    } else if (status == "varVal") {
                        varVal += iterator
                    }
                } else { status = "varVal" }

            }
            vars[varName] = varVal
        } else if ((code.includes("=") == false) & (code.includes("?"))) {
            let status = "varName"
            let varName = ""
            let varVal = ""
            for (const iterator of code) {
                if (iterator == "|") {break}
                if (iterator != "?") {
                    if (status == "varName") {
                        varName += iterator
                    } else if (status == "varVal") {
                        varVal += iterator
                    }
                } else { status = "varVal" }
                
            }
            allowed = vars[varName] == vars[varVal]
        } else if (code[0] + code[1] == "--") {
            let varName = ""
            let counter = 1

            for (const iterator of code) {
                if (iterator == "|") {break}
                if (counter > 2) {
                    varName += iterator
                } 
                counter++
            }
            msg = vars[varName]
        }

    } else {
        allowed = true
    }

    console.log(vars)

    if (msg != "") {document.getElementById("output").innerHTML += ("<li>" + msg + "</li>")}
}

cls = () => {document.getElementById("output").innerHTML = ""}
purgeVars = () => {vars = {}}