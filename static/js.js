$(document).ready(function () {
    if (document.getElementById('input-age').disabled == true) {
        document.getElementById('label-age').style.color = "grey"
    }
    if (document.getElementById('wish1').disabled == true) {
        document.getElementById('label-wish').style.color = "grey"
    }

    // enable button only when there is input
    $("#input-name").on("input", function () {
        disable_enable_btn("input-name", "btn-name")
    });
    $("#input-age").on("input", function () {
        disable_enable_btn("input-age", "btn-age")
    });
    $("#input-wish").on("input", function () {
        disable_enable_btn("input-wish", "btn-wish")
    });


    $("#btn-name").on("click", function () {
        // get input value
        input_value = document.getElementById('input-name').value.toLowerCase()
        if (input_value != "stefflpeffl") {
            document.getElementById("modal-text").innerHTML = "Hmm... bist du dir sicher, dass das dein Name ist?"
            $('#modal-error').modal('show')
        }
        if (input_value == "stefflpeffl") {
            document.getElementById('input-name').disabled = true
            document.getElementById('btn-name').disabled = true

            document.getElementById('input-age').disabled = false
            document.getElementById('label-age').style.color = "black"
        }
    });

    $("#btn-age").on("click", function () {
        // get input value
        input_value = document.getElementById('input-age').value
        if (input_value > 34) {
            document.getElementById("modal-text").innerHTML = "Ach komm, mach dich nicht älter als du bist!"
            document.getElementById('btn-modal-help').style.visibility = "hidden"
            $('#modal-error').modal('show')
        }
        else if (input_value < 34) {
            document.getElementById("modal-text").innerHTML = "Nicht schummeln!!"
            document.getElementById('btn-modal-help').style.visibility = "hidden"
            $('#modal-error').modal('show')
        }
        else if (input_value == 34) {
            document.getElementById("modal-text").innerHTML = "SO ALT?????"
            document.getElementById('btn-modal-help').style.visibility = "hidden"
            document.getElementById('img-old').style.display = "block"
            document.getElementById('btn-modal-again').innerHTML = "Ja leider :("
            $('#modal-error').modal('show')

            document.getElementById('input-age').disabled = true
            document.getElementById('btn-age').disabled = true

            document.getElementById('wish1').disabled = false
            document.getElementById('wish2').disabled = false
            document.getElementById('wish3').disabled = false
            document.getElementById('wish4').disabled = false
            document.getElementById('label-wish').style.color = "black"
        }
    });

    $(".form-check-input").on("change", function () {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
        if (checkedOne == true) {
            document.getElementById('btn-finish').disabled = false
        }
        else {
            document.getElementById('btn-finish').disabled = true
        }
    })

    $("#btn-finish").on("click", function () {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let wishes = []
        Array.from(checkboxes).forEach(element => {
            if (element.checked == true) {
                wishes.push(element.value)
            }
        });
        console.log("TEST!!!!")
        console.log(wishes)
        $.ajax({
            type: "POST",
            url: "/wishes",
            data: JSON.stringify({ "wishes": wishes }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
        window.location.href = "/happybirthday"
    })

    $("#btn-modal-help").on("click", function () {
        $('#modal-error').modal('hide')
        if (document.getElementById('modal-text').innerHTML == "Hmm... bist du dir sicher, dass das dein Name ist?") {
            document.getElementById('input-name').value = "Stefflpeffl"
            document.getElementById('input-name').disabled = true
            document.getElementById('btn-name').disabled = true

            document.getElementById('input-age').disabled = false
            document.getElementById('label-age').style.color = "black"
        }
        if (document.getElementById('modal-text').innerHTML == "SO ALT?????") {
            document.getElementById('input-age').disabled = true
            document.getElementById('btn-age').disabled = true

            document.getElementById('label-wish').style.color = "black"
        }
    })

});

disable_enable_btn = function (id_input, id_btn) {
    let input_length = document.getElementById(id_input).value.length
    if (input_length > 0) {
        document.getElementById(id_btn).disabled = false
    }
    if (input_length == 0) {
        document.getElementById(id_btn).disabled = true
    }
}
