var {firestore,cors,successResponseGet,errorResponse} = require('./admin.js')
var productsRef = firestore.collection('products')
var categoryRef = firestore.collection('categories')

const getProductList = (req,res) => {
    return cors(req,res,()=>{
        if(req.method === 'GET'){
            var productList = productsRef.get()
                .then(snapshot => {
                    let res_data = {}
                    res_data['return_code'] = '200'
                    res_data['descrip'] = 'success to get the list of products'
                    products = []
                    snapshot.forEach(doc => {
                        let eachProduct = doc.data()
                        eachProduct['productID'] = doc.id
                        products.push(eachProduct)
                    })
                    res_data['products'] = products 
                    successResponseGet(res,res_data)
                    return snapshot
                }).catch(err=>{
                    errorResponse(res,err.details)
                })
        }else {
            errorResponse(res,"Error request method")
        }
    })
}

const addProduct = (req,res) => {
    return cors(req,res,() => {
        if(req.method === 'POST'){

            let productName = req.get('name')
            let productPrice = req.get('price')
            let categoryID = req.get('categoryID')
            let productDetail = req.get('detail')
            let imgUrl = req.get('imgUrl')
            let country = req.get('country')
            let vol = req.get('vol')
            let distributor = req.get('distributor')
            let ABV = req.get('ABV')



            let data = {}
            data['productName'] = productName
            data['productPrice'] = productPrice
            data['productDetail'] = productDetail
            data['categoryID'] = categoryID
            data['imgUrl'] = imgUrl
            data['country'] = country
            data['vol'] = vol
            data['distributor'] = distributor
            data['ABV'] = ABV


            var productAdded = productsRef.add(data).then(ref => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Success to write on db'
                res_data['productID'] = ref.id
                successResponseGet(res,res_data)
                return
            }).catch(err=>{
                errorResponse(res,err.details)
            })
        }else {
            errorResponse(res,"Error request method")
        }
    })
}

const getProductListByCategoryname = (req,res) => {
    return cors(req,res,() => {
        if(req.method === 'POST'){
            let categoryName = req.get('categoryName')
            let products = []
            let categoryID = 0
            let res_data = {}
            let getProducts = categoryRef.where('categoryName','==',categoryName).get()
            .then(snap => {
                if(!snap.empty){
                    snap.forEach(ref=>{
                        categoryID = ref.id
                    })
                }
                return productsRef.where('categoryID','==',categoryID).get()
            })
            .then(snap => {
                snap.forEach(ref => {
                    let productData = ref.data()
                    productData['productID'] = ref.id
                    products.push(productData)
                })
                res_data['return_code'] = '200'
                    res_data['descrip'] = 'Success to get products of category name' 
                    res_data['products'] = products
                    successResponseGet(res,res_data)  
                return
            }).catch(error=>{
                res_data['return_code'] = '400'
                res_data['descrip'] = 'Error Category not found' 
                successResponseGet(res,res_data)
            })


            return
        }else {
            errorResponse(res,"Error request method")
        }
    })
}

const searchProductByName = (req,res) => {
    return cors(req,res,() => {
        if(req.method === 'POST'){
            let keyword = req.get('keyword')

            let products = []
            let categoryName = []
            let result = []
            let resultFromCat = []

            var queryProduct = productsRef.get()
            .then(snap=>{
                if(!snap.empty){
                    snap.forEach(ref => {
                        let productData = ref.data()
                        productData['productID'] = ref.id
                        products.push(productData)
                    })
                }
                return categoryRef.get()
            })
            .then(snap=>{
                if(!snap.empty){
                    snap.forEach(ref => {
                        let categoryData = ref.data()
                        categoryData['categoryID'] = ref.id
                        categoryName.push(categoryData)
                    })
                }
                return 
            })
            .then(() => {
                categoryName.forEach(cat => {
                    let name = cat['categoryName']
                    if(name.toLowerCase().search(keyword) !== -1){
                        resultFromCat.push(cat['categoryID'])
                    }
                })
                products.forEach(product => {
                    let name = product['productName']
                    let catID = product['categoryID']
                    if(name.toLowerCase().search(keyword) !== -1 || resultFromCat.includes(catID)){
                        result.push(product)
                    }
                })
                result.sort()
                return
            })
            .then(() => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Search in database success.'
                res_data['products'] = result
                successResponseGet(res,res_data)
                return
            })
            .catch(err=>{
                errorResponse(res,err)
            })
        }else {
            errorResponse(res,"Error request method")
        }
    })
}

const removeProduct = function (req,res){
    return cors(req,res,()=>{
        if(req.method==='POST'){
            let productID = req.get('productID')

            let removeProducted = productsRef.doc(productID).delete()
            .then(ref => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Success to delete '+productID+' from product list.'
                successResponseGet(res,res_data)
                return ref            
            })
            .catch(err=>{
                errorResponse(res,err.details)
            })
        }
        else {
            errorResponse(res,"Error request method")
        }
    })
}

module.exports = {
    addProduct,getProductList,getProductListByCategoryname,searchProductByName,removeProduct,
}