function setActiveNavButton(element) {
    const nav = document.getElementById("headerNav");
    const buttonsNav = nav.getElementsByTagName("button");
    for (const button of buttonsNav) {
        button.setAttribute('class', 'btn btn-secondary me-1');
    }
    element.setAttribute('class', 'btn btn-primary me-1');
}

function enableLoadSpinner(element = document.getElementById('articleArea')) {
    element.innerHTML +=
        '<div id="loadSpinner" class="d-flex justify-content-center h-50">\n' +
        '   <div class="spinner-border mt-auto"></div>\n' +
        '</div>'
}

function disableLoadSpinner() {
    const spinner = document.getElementById("loadSpinner");
    spinner.remove();
}

function getBlogs(element) {
    let blogsHeaderHTML = "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
        "                <div class=\"me-auto\">Name</div>\n" +
        "                <div style=\"min-width: 124px\">Category</div>\n" +
        "                <div style=\"min-width: 124px\">Rating</div>\n" +
        "                <div style=\"min-width: 124px\">Subscribers</div>\n" +
        "            </div>\n";

    setActiveNavButton(element);
    const request = new XMLHttpRequest();
    const articleArea = document.getElementById('articleArea');
    articleArea.innerHTML = blogsHeaderHTML;
    enableLoadSpinner()
    request.onload = function () {
        disableLoadSpinner();
        articleArea.innerHTML += parseJsonBlogsIntoHTML(this.responseText);
    }
    request.open('GET', 'http://localhost:81/blog', true);
    request.send();
}

function getCategories(element) {
    let categoryHeaderHTML = "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
        "                <div class=\"me-auto\">Name</div>\n" +
        "                <div style=\"min-width: 124px\">Rating</div>\n" +
        "                <div style=\"min-width: 124px\">Subscribers</div>\n" +
        "            </div>\n";

    setActiveNavButton(element);
    const request = new XMLHttpRequest();
    const articleArea = document.getElementById('articleArea');
    articleArea.innerHTML = categoryHeaderHTML;
    enableLoadSpinner()
    request.onload = function () {
        disableLoadSpinner();
        articleArea.innerHTML += parseJsonCategoriesIntoHTML(this.responseText);
    }
    request.open('GET', 'http://localhost:81/category', true);
    request.send();
}

function getArticles(element) {
    let articleHeaderHTML = "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
        "                <div class=\"me-auto\">Name</div>\n" +
        "                <div style=\"min-width: 124px\">Rating</div>\n" +
        "                <div style=\"min-width: 124px\">Blog</div>\n" +
        "            </div>\n";

    setActiveNavButton(element);
    const request = new XMLHttpRequest();
    const articleArea = document.getElementById('articleArea');
    articleArea.innerHTML = articleHeaderHTML;
    enableLoadSpinner()
    request.onload = function () {
        disableLoadSpinner();
        articleArea.innerHTML += parseJsonArticlesIntoHTML(this.responseText);
    }
    request.open('GET', 'http://localhost:81/article', true);
    request.send();
}

function setArticlePage(articleId) {
    const articleArea = document.getElementById('articleArea');
    articleArea.innerHTML = '';
    enableLoadSpinner();

    const request = new XMLHttpRequest();
    request.onload = function () {
        disableLoadSpinner();
        const article = JSON.parse(this.responseText);
        articleArea.innerHTML = '<div class="bg-light p-3">\n' +
            '                    <div>\n' +
            '                        <div class="d-flex flex-row">\n' +
            '                            <div class="me-1">\n' +
            '                                <object data="svg/address-card-solid.svg" height="20" width="20"></object>\n' +
            '                            </div>\n' +
            `                            <div>${article.author.firstName} ${article.author.lastName}</div>\n` +
            `                            <div class="text-muted ms-1">${article.time}</div>\n` +
            '                        </div>\n' +
            `                        <p><h3>${article.title}</h3></p>\n` +
            '                    </div>\n' +
            `                    <div>${article.content}</div>\n` +
            '                    <div class="d-flex flex-row border-top pt-2">\n' +
            '                        <button class="btn btn-primary d-flex">\n' +
            '                            <object data="svg/heart-solid.svg" height="20" width="20"></object>\n' +
            '                            <div class="ms-1">Like me</div>\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n'

        articleArea.innerHTML += '<div id="comments" class="bg-light p-3 mt-2">\n' +
            '                    <div class="border-bottom mb-2">\n' +
            '                        <p>3 Comments</p>\n' +
            '                    </div>' +
            '                   </div>'
        enableLoadSpinner(document.getElementById('comments'));
    };
    request.open("GET", `http://localhost:81/article/${articleId}`, true);
    request.send();
}

function setHomePage(element) {
    setActiveNavButton(element);
    let homePageHTML = "<div class=\"bg-light p-3\">\n" +
        "                <h4>Home Page</h4>\n" +
        "                <p>It is a home page</p>\n" +
        "            </div>";
    const articleArea = document.getElementById('articleArea');
    articleArea.innerHTML = homePageHTML;
}

function parseJsonBlogsIntoHTML(json) {
    let result = "<div>";
    let blogs = JSON.parse(json);
    blogs.forEach(blogJson => {
        result += "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
            "                <div class=\"d-flex flex-row me-auto\">\n" +
            "                    <div class=\"mt-2\">" +
            "                       <object data=\"svg/blog-solid.svg\" height=\"20\" width=\"20\" ></object>\n" +
            "                    </div>" +
            "                    <div class=\"ms-3\">\n" +
            "                        <a href=\"#\" class=\"link-primary text-decoration-none text-black\">" + blogJson.name + "</a>\n" +
            "                        <div class=\"text-muted\">" + blogJson.alias + "</div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">" + blogJson.category.name + "</div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">Soon</div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">Soon</div>\n" +
            "            </div>"
    })
    result += "</div>";
    return result;
}

function parseJsonCategoriesIntoHTML(json) {
    let result = "<div>";
    let categories = JSON.parse(json);
    categories.forEach(categoryJson => {
        result += "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
            "                <div class=\"d-flex flex-row me-auto\">\n" +
            "                    <div class=\"mt-2\">" +
            "                       <object data=\"svg/arrow-alt-circle-right-regular.svg\" height=\"20\" width=\"20\" ></object>\n" +
            "                    </div>" +
            "                    <div class=\"ms-3\">\n" +
            "                        <a href=\"#\" class=\"link-primary text-decoration-none text-black\">" + categoryJson.name + "</a>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">" + "Soon" + "</div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">Soon</div>\n" +
            "            </div>"
    })
    result += "</div>";
    return result;
}

function parseJsonArticlesIntoHTML(json) {
    let result = "<div>";
    let articles = JSON.parse(json);
    articles.forEach(articleJson => {
        result += "<div class=\"d-flex flex-row bg-light border-bottom px-3 py-1\">\n" +
            "                <div class=\"d-flex flex-row me-auto\">\n" +
            "                    <div class=\"mt-2\">" +
            "                       <object data=\"svg/newspaper-solid.svg\" height=\"20\" width=\"20\" ></object>\n" +
            "                    </div>" +
            "                    <div class=\"ms-3\">\n" +
            "                        <a onclick='setArticlePage(\"" + articleJson.id + "\")' href='#' class=\"link-primary text-decoration-none text-black\">" + articleJson.title + "</a>\n" +
            "                        <div class=\"text-muted\">" + articleJson.author.firstName + " " + articleJson.author.lastName + "</div>" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">" + "Soon" + "</div>\n" +
            "                <div class=\"text-muted\" style=\"min-width: 124px\">Soon</div>\n" +
            "            </div>"
    })
    result += "</div>";
    return result;
}