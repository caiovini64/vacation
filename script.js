const Modal = {
    open() {
        document
            .querySelector(".modal-overlay")
            .classList.add("active")
    },
    close() {
        document
            .querySelector(".modal-overlay")
            .classList.remove("active")
    }

}

const aplications = [
    {

        company: 'Github',
        position: 'Software Engineer',
        date: '25/03/2001',
        jobDescription: 'github.com/jobs',
    },
    {

        company: 'Github',
        position: 'Software Engineer',
        date: '25/03/2001',
        jobDescription: 'github.com/jobs',
    },


]

const Aplication = {
    all: aplications,
    add(aplication) {
        Aplication.all.push(aplication)

        App.reload()
    },

    remove(index) {
        Aplication.all.splice(index, 1)
        App.reload()
    }
}

const DOM = {

    aplicationContainer: document.querySelector('#data-table tbody'),

    addAplication(aplication, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLAplication(aplication)
        DOM.aplicationContainer.appendChild(tr)
    },

    innerHTMLAplication(aplication) {
        const html = `
            <td class="company">${aplication.company}</td>
            <td class="position">${aplication.position}</td>
            <td class="date">${aplication.date}</td>
            <td class="jobdescription">${aplication.jobDescription}</td>
            <td><img src="./assets/icons8-remove.svg" alt="Remover Aplicacao"></td>
            `
        return html
    },

    clearAplications() {
        DOM.aplicationContainer.innerHTML = ""
    }
}

const Utils = {
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
    },
}

const Form = {
    company: document.querySelector("input#company"),
    position: document.querySelector("input#position"),
    date: document.querySelector("input#date"),
    jobdescription: document.querySelector("input#jobdescription"),

    getValues() {
        return {
            company: Form.company.value,
            position: Form.position.value,
            date: Form.date.value,
            jobdescription: Form.jobdescription.value,
        }
    },

    validateFields() {
        const { company, position, date, jobdescription } = Form.getValues()
        if (company.trim() === '' || position.trim() === '' || date.trim() === '' || jobdescription.trim() ===''  ) {
            throw new Error()
        }
    },

    formatValues() {
        let { company, position, date, jobdescription } = Form.getValues()
        date = Utils.formatDate(date)
        //So preciso formatar a data
        return { company, position, date, jobdescription }
    },

    clearFields(){
        Form.jobdescription = ''
        Form.company = ''
        Form.position = ''
        Form.date = ''
    
    },

    

    submit(event) {
        event.preventDefault()


        try {
            Form.validateFields()

            const aplication = Form.formatValues()

            Aplication.add(aplication)

            Form.clearFields()

            Modal.close()
            App.reload()
        } catch (error) {
            alert('Por favor, preencha todos os campos')
        }
    },
}

const App = {
    init() {
        Aplication.all.forEach(function (aplication) {
            DOM.addAplication(aplication)
        })
    },
    reload() {
        DOM.clearAplications()
        App.init()

    },
}
App.init()




