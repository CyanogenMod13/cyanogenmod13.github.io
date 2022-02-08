class Category {
    id
    name
}

class Author {
    id
    firstName
    lastName
    penName
}

class Blog {
    id
    name
    alias
    category
    author
}

class Article {
    id
    title
    content
    author
    blog
    time
}