window.addEventListener('load', () => {
    // Elements
    const optionButtons = document.querySelectorAll('.option_button')
    const advancedOptionButtons = document.querySelectorAll('.adv_option_button')

    const formatButtons = document.querySelectorAll('.format')

    const scriptButtons = document.querySelectorAll('.script')

    const fontName = document.getElementById('fontName')
    const fontSizeRef = document.getElementById('fontSize')

    const linkButton = document.getElementById('createLink')

    const alignButtons = document.querySelectorAll('.align')

    const tabSpacingButtons = document.querySelectorAll('.tab_spacing')

    const textInput = document.getElementById('textInput')

    // font lists
    let fontList = [
        "Arial",
        "Verdana",
        "Times New Roman",
        "Garamond",
        "Georgia",
        "Courier New",
        "Cursive",
    ]

    // Initial settings
    const initializer = ()=>{
        // function calls for highlighting buttons
        highlighter(alignButtons, true)
        highlighter(tabSpacingButtons, true)
        highlighter(formatButtons, false)
        highlighter(scriptButtons, true)

        // create options for font names
        fontList.map((name)=>{
            let option = document.createElement('option')
            option.value = name
            option.innerHTML = name
            fontName.appendChild(option)
        })

        // create options for fontsize (maxSize=7)
        let i, maxSize = 7
        for(i=1;i<=maxSize;i++){
            let option = document.createElement('option')
            option.value = i
            option.innerHTML = i
            fontSizeRef.appendChild(option)
        }

        // default size
        fontSizeRef.value = 3
    }


    // Highlight clicked buttons
    const highlighter = (className, needsRemoval)=>{
        className.forEach((button)=>{
            button.addEventListener('click', ()=>{
                // needsRemoval (true means only one button should be highlight and other would be normal)
                if(needsRemoval){
                    let is_active = false
                    // If currently clicked button is alredy active
                    if(button.classList.contains('active')){
                        is_active = true
                    }

                    // Remove highlights from other buttons
                    removeHighlighter(className)
                    if(!is_active){
                        // highlight clicked button
                        button.classList.add('active')
                    }
                }else {
                    // if other buttons can be highlighted
                    button.classList.toggle('active')
                }
            })
        })
    }


    // Remove highlight
    const removeHighlighter = (className)=>{
        className.forEach((button)=>{
            button.classList.remove('active')
        })
    }

    const modifyText = (command, defaultUi, value)=>{
        // execCommand executes command on selected text
        document.execCommand(command, defaultUi, value)
    }

    // For basic operations which (don't need value parameter)
    optionButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            modifyText(button.id, false, null)
        })
    })

    // Options (required value parameter)
    advancedOptionButtons.forEach((button)=>{
        button.addEventListener('change', ()=>{
            modifyText(button.id, false, button.value)
        })
    })

    // link
    linkButton.addEventListener('click', ()=>{
        let userLink = prompt("Enter a Url")
        // if link has http then directly else add https
        if(/http/i.test(userLink)){
            modifyText(linkButton.id, false, userLink)
        }else {
            userLink = "http://" + userLink
            modifyText(linkButton.id, false, userLink)
        }
    })

    


    initializer()
})
