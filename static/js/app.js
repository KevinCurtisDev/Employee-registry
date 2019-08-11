const searchContainer = document.querySelector('.search-container')
const searchHtml = `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    </form>`

searchContainer.innerHTML = searchHtml;