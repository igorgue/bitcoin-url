window.BtcToMe = {}

BtcToMe.params = null

BtcToMe.getAddressFromUri = function (uri) {
    return uri
        .split("?")[0]
        .replace("bitcoin://", "")
        .replace("bitcoin:", "")
}

BtcToMe.setSendButton = function (value) {
    var sendEl = document.getElementById("send")

    sendEl.setAttribute("href", value)
}

BtcToMe.setAddress = function (value) {
    var addressEl = document.getElementById("address")
    var address = this.getAddressFromUri(value)

    addressEl.innerHTML = address
}

BtcToMe.setQRCode = function (value) {
    var qrCodeEl = document.getElementById("qr-code")
    var QRC = qrcodegen.QrCode

    var qr0 = QRC.encodeText(value, QRC.Ecc.MEDIUM)
    var svg = qr0.toSvgString(4)

    qrCodeEl.innerHTML = svg
}

BtcToMe.setAmountInput = function (value) {
    var bitcoinUrlParams = new URLSearchParams(value.split("?")[1])
    var amount = bitcoinUrlParams.get("amount")
    var amountEl = document.getElementById("amount")

    amountEl.value = amount
}

BtcToMe.setMessage = function (value) {
    var bitcoinUrlParams = new URLSearchParams(value.split("?")[1])
    var message = bitcoinUrlParams.get("message")
    var messageEl = document.getElementById("message")

    messageEl.innerHTML = message
}

BtcToMe.display = function () {
    var data = params.get('data')

    if (data) {
        this.setSendButton(data)
        this.setAddress(data)
        this.setQRCode(data)
        this.setAmountInput(data)
        this.setMessage(data)
    }
}

BtcToMe.form = function () {
    // TODO Add form to create payment request
}

BtcToMe.main = function () {
    var url = window.location.href

    if (url.includes("/?")) params = new URLSearchParams(url.split('/?')[1])

    if (params) {
        BtcToMe.display()
    } else {
        BtcToMe.form()
    }
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    BtcToMe.main()
} else {
    document.addEventListener("DOMContentLoaded", BtcToMe.main)
}