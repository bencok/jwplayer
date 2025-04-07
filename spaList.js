function favoritar(url, token, info) {
    var element = document.getElementById('favoritarAnime')
    var xhttp = new XMLHttpRequest();
    var formData = new FormData();
    formData.append('info', info)
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response.state === 1) {
                element.children[0].classList.remove('far');
                element.setAttribute("style", "background: rgba(255, 0, 0, 0.5)");
                element.children[0].classList.add('fas');
                element.setAttribute("data-original-title", "Desfavoritar");
            } else if (this.response.state === 0) {
                element.children[0].classList.remove('fas');
                element.removeAttribute("style");
                element.children[0].classList.add('far');
                element.setAttribute("data-original-title", "Favoritar");
            }
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("X-CSRF-TOKEN", token);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.responseType = 'json';
    xhttp.send(formData);
}

function changeAllList(state) {
    let elemento = document.getElementById('episodesList').children
    for (let index = 0; index < elemento.length; index++) {
        const vistoButton = elemento[index].children[1].children[0];
        if (state === 1) {
            if (vistoButton.classList.contains('btn-primary')) {
                vistoButton.classList.add('btn-success')
                vistoButton.classList.remove('btn-primary')
                vistoButton.children[0].classList.add('fa-eye')
                vistoButton.children[0].classList.remove('fa-eye-slash')
            }
        } else if (state === 0) {
            if (vistoButton.classList.contains('btn-success')) {
                vistoButton.classList.add('btn-primary')
                vistoButton.classList.remove('btn-success')
                vistoButton.children[0].classList.add('fa-eye-slash')
                vistoButton.children[0].classList.remove('fa-eye')
            }
        }
    }
}

function markVistoRequest(info, token, url, element = null, params = null) {
    var formData = new FormData();
    formData.append('info', info)
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            formData.append(`${key}`, value)
        }
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response.state === 1 && element) {
                if (this.response.full_anime) element.children[1].innerHTML = "Desmarcar todos como Visto"
                element.classList.add('btn-success')
                element.classList.remove('btn-primary')
                element.children[0].classList.add('fa-eye')
                element.children[0].classList.remove('fa-eye-slash')
                if (this.response.full_anime) changeAllList(1)

            } else if (this.response.state === 0 && element) {
                if (this.response.full_anime) element.children[1].innerHTML = "Marcar todos como Visto"
                element.classList.add('btn-primary')
                element.classList.remove('btn-success')
                element.children[0].classList.add('fa-eye-slash')
                element.children[0].classList.remove('fa-eye')
                if (this.response.full_anime) changeAllList(0)
            }
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("X-CSRF-TOKEN", token);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.responseType = 'json';
    xhttp.send(formData);
}
