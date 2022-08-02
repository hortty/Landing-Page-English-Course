class Product {
    constructor() {
        this._id = 1
        this.productsArray = []
        this.edit_id = null
    }
    tableList() {
        let tbody = document.getElementById("tbody")
        tbody.innerText = ''
        for(let x=0;x<this.productsArray.length;x++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            td_id.innerText = this.productsArray[x].id

            let td_name = tr.insertCell()
            td_name.innerText = this.productsArray[x].name

            let td_value = tr.insertCell()
            td_value.innerText = this.productsArray[x].value

            let td_action = tr.insertCell()

            let img1 = document.createElement("img")
            img1.src = "img/bin.png"
            img1.setAttribute("onclick", "product.del("+this.productsArray[x].id+")")     //"funcaorealizada()", "funcaochamada()"
            td_action.appendChild(img1)
            let img2 = document.createElement("img")
            img2.src = "img/editar.png"
            img2.setAttribute("onclick", "product.edit("+JSON.stringify(this.productsArray[x])+")")     //JSON format (quebra object properties)
            td_action.appendChild(img2)
        }
    }
    edit(data) {
        this.edit_id = data.id
        document.getElementById("produto").value = data.name
        document.getElementById("valor").value = data.value

        document.getElementById("b1").innerText = 'Update'
    }
    del(id) {
        let tbody = document.getElementById("tbody")
        for(let i=0;i<this.productsArray.length;i++) {
            if(this.productsArray[i].id == id) {
                this.productsArray.splice(i,1)
                tbody.deleteRow(i)
            }      
        }
    }
    save() {
        let product = this.readData()
        if(this.validate(product)) {
            if(this.edit_id == null) {
                this.add(product)
            }
            else {
                this.update(this.edit_id, product)
            }
        }
        this.tableList()
        this.cancel()
    }
    update(id, produto) {
        for(let i=0;i<this.productsArray.length;i++) {
            if(this.productsArray[i].id == id) {
                this.productsArray[i].name = produto.name
                this.productsArray[i].value = produto.value
            }
        }
        document.getElementById("b1").innerText = 'Save'
        this.edit_id = null
    }
    add(product) {
        product.value = parseFloat(product.value)
        this.productsArray.push(product)
        this._id++
    }
    validate(product) {
        let message = ''
        if(product.name == '') {
            message += 'Product name? \n'
        }
        if(product.value == '' || product.value < 0) {
            message += 'Product value? \n'
        }
        if(message != '') {
            alert(message)
            return false
        }
        return true
    }
    cancel() {
        document.getElementById("valor").value = ''
        document.getElementById("produto").value = ''
    }
    readData() {
        let product = {}
        product.name = document.getElementById("produto").value
        product.value = document.getElementById("valor").value
        product.id = this._id
        return product
    }
}

let product = new Product()
