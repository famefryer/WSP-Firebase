var {firestore,cors,successResponseGet,errorResponse} = require('./admin.js')
var paymentRef = firestore.collection('payments')

const getPayment = (req,res) => {
    return cors(req,res,()=>{
        if(req.method === 'GET'){
            var paymentList = paymentRef.get()
                .then(snapshot => {
                    let res_data = {}
                    res_data['return_code'] = '200'
                    res_data['descrip'] = 'success to get the list of payments'
                    payment = []
                    snapshot.forEach(doc => {
                        let type = doc.data()
                        type['paymentID'] = doc.id
                        payment.push(type)
                    })
                    res_data['payments'] = payment 
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

const addPayment = (req,res) => {
    return cors(req,res,() => {
        if(req.method === 'POST'){

            let orderID = req.get('orderID')
            let username = req.get('username')
            let name = req.get('name')
            let paymentMethod = req.get('paymentMethod')
            let accountNumber = req.get('accountNumber')
            let transactionNumber = req.get('transactionNumber')
            let paymentAmount = req.get('paymentAmount')
            let paymentDate = req.get('paymentDate')
            let paymentTime = req.get('paymentTime')

            let paymentConfirm = false

            let data = {}
            data['orderID'] = orderID
            data['username'] = username
            data['name'] = name
            data['paymentMethod'] = paymentMethod
            data['accountNumber'] = accountNumber
            data['transactionNumber'] = transactionNumber
            data['paymentAmount'] = paymentAmount
            data['paymentDate'] = paymentDate
            data['paymentTime'] = paymentTime
            data['paymentConfirm'] = paymentConfirm

            var paymentAdded = paymentRef.add(data).then(ref => {
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

const removePayment = function (req,res){
    return cors(req,res,()=>{
        if(req.method === 'POST'){
            let paymentID = req.get('paymentID')

            var removePayment = paymentRef.doc(paymentID).delete().then(ref => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Success to remove '+paymentID+' on db.'
                successResponseGet(res,res_data)
                return ref.id
            }).catch(err=>{
                errorResponse(res,err.details)
            })
        }else {
            errorResponse(res,"Error request method")
        }
    })
}

module.exports = {getPayment,addPayment,removePayment,}