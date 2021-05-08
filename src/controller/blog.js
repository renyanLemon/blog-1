const getList = (author, keyword) => {
    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createdTime: 1620355470961,
        author: 'A'
    }]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createdTime: 1620355470961,
        author: 'A'
    }
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包含 title，content属性
    return {
        id: 3 
    }
}

const updateBlog = (id, blogData = {}) => {
    //blogData 是一个博客对象，包含 title，content属性
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}