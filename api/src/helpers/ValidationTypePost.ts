function validateUrl(url: string) {
    const regex = /\/api\/users\/\w+\/(posts|scales|messages)\/\w+\/comments/;
    const match = url.match(regex);  

    if (!match || !match[1]) {
      throw new Error('Invalid URL format or unsupported post type');
    }

    const postType = match[1]; 

    return postType;
}

export default validateUrl