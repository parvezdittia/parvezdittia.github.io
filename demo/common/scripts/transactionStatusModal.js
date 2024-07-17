const TXN_STATUSES={
    FAILED:"FAILED",
    SUCCESS:"SUCCESS",
    CANCEL:"CANCEL"
}
// Select the modal
const txnStatusModal = document.getElementById("txnStatusModal");
const txnSuccessModal = document.getElementById("success");
const txnFailedModal = document.getElementById("failure");
// Select button
const btn = document.getElementById("openModalBtn");
// Get the closing span
const span = document.getElementsByClassName('close')[0];
// Select body tag
const body = document.body;
let statusType = "";

function openModal(res) {
    
    txnStatusModal.style.display = "block";
    body.style.overflow = "hidden";
    setInnerHTML(res);
}

//close the modal 
function handleClose() {
    txnStatusModal.style.display = "none";
    body.style.overflowY = "auto";
}

// close modal after 10 seconds
function autoClose() {
    setTimeout(handleClose, 10000);
}


// For anywhere click
window.onclick = function (event) {
    if (event.target == txnStatusModal) {
        txnStatusModal.style.display = "none";
    }
}
// append different content in the txnStatusModal based on condition
function setInnerHTML(response) {
    const statusType = response?.txnStatus;
    const actualAmount = Number(response?.amount);
    const discount = Number(response?.discount || 0);
    const netAmountDebit = Number(response?.net_amount_debit);
    const finalAmount = netAmountDebit || (actualAmount - discount).toFixed(2);
    const errorMessage = response?.error_Message || '';
    txnStatusModal.style.display = "block";
    if (statusType == TXN_STATUSES.SUCCESS) {
      
        success.style.display = "";
        failure.style.display = "none";

        document.getElementById("actual-amount").innerText = actualAmount;

        if(discount){
            document.getElementById("discount-section").style.display = "";
            document.getElementById("discount-amount").innerText = discount;
        } else {
            document.getElementById("discount-section").style.display = "none";
        }

        document.getElementById("final-amount").innerText = finalAmount;

        autoClose();
    }
    else if (statusType === TXN_STATUSES.FAILED || statusType === TXN_STATUSES.CANCEL) {

        success.style.display = "none";
        failure.style.display = "";
        document.getElementById("error-message").innerText = errorMessage;
        autoClose();
    }
}