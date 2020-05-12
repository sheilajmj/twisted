const users = [
    {
        id: 1,
        username: "user1",
        password: "password1",
        admin: "true"
    },
    {
        id: 2,
        username: "user2",
        password: "password2",
        admin: "false"
    },
    {
        id: 3,
        username: "user3",
        password: "password3",
        admin: "false"
    },
]

const patterns= [
    {
        id: 1,
        contributor: 1,
        name: "Pattern1",
        description: "description1",
        craft: "knit",
        yarn_weight: "worsted",
        needle_size: "US 8 - 5mm",
        pdf_file_link: "https://twistedknit.s3-us-west-1.amazonaws.com/DemoPDF.pdf",
        image: "placeholder-img.svg",
        price: "free"
    },
    {
        id: 2,
        contributor: 1,
        name: "Pattern2",
        description: "description2",
        craft: "crochet",
        yarn_weight: "worsted",
        needle_size: "US 8 - 5mm",
        pdf_file_link: "https://twistedknit.s3-us-west-1.amazonaws.com/DemoPDF.pdf",
        image: "placeholder-img.svg",
        price: "free"
    },
    {
        id: 3,
        contributor: 2,
        name: "Pattern3",
        description: "description3",
        craft: "crochet",
        yarn_weight: "worsted",
        needle_size: "US 8 - 5mm",
        pdf_file_link: "https://twistedknit.s3-us-west-1.amazonaws.com/DemoPDF.pdf",
        image: "placeholder-img.svg",
        price: "free"
    }
]

const followers = [
    {
    id: 1, 
    user_id: 1, 
    following: 2
    },
    {
    id: 2, 
    user_id: 1, 
    following: 3
    },
    {
    id: 1, 
    user_id: 2, 
    following: 3
    }
]

const comments = [
    {
    id: 1,
    author: 1, 
    pattern_id: 1
    },
    {
    id: 2,
    author: 2, 
    pattern_id: 1
    },
    {
    id: 3,
    author: 3, 
    pattern_id: 1
    }
]

const purchases = [
    {
    id: null,
    pattern_id: null,
    user_id: null,    
    date: null,
    method: null,
    }
]

const contributions = [
    {
        id: 1,
        contributor: 1, 
        pattern_id: 1
    },
    {
        id: 2,
        contributor: 1, 
        pattern_id: 2
    },
    {
        id: 3,
        contributor: 2, 
        pattern_id: 3
    }
]

const favorites = [
    {
        id: 1, 
        contributor: 1,
        favorited_by: 2, 
        pattern_id: 1
    },
    {
        id: 2, 
        contributor: 1,
        favorited_by: 2, 
        pattern_id: 2
    },
    {
        id: 3, 
        contributor: 2,
        favorited_by: 3, 
        pattern_id: 3
    },
]

module.exports = { users, followers, comments, contributions, favorites, purchases, patterns }

