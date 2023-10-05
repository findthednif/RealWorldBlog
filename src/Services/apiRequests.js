
const url = "https://blog.kata.academy/api/";
export const getGlobalArticles = async (offset) => {
  const responce = await fetch(`${url}articles?limit=5&offset=${offset}`);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    throw new Error(`getGlobalArticles fetch failed, ${responce.status}`);
  }
};
export const getArticle = async (slug) => {
  const responce = await fetch(`${url}articles/${slug}`);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    throw new Error(`getArticle fetch failed, ${responce.status}`);
  }
};
export const registerUser = async (userData) => {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}users`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    const error = new Error(`registerUser fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
};
export const loginUser = async (userData) => {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}users/login`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    const error = new Error(`loginUser fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
};
export const getUser = async (userToken) => {
  const fetchParams = {
    method: "GET",
    headers: {
      Authorization: `Token ${userToken}`,
    },
  };
  const responce = await fetch(`${url}user`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    throw new Error(`getUser fetch failed, ${responce.status}`);
  }
};
export const editUser = async (userData, userToken) => {
  const fetchParams = {
    method: "PUT",
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}user`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    const error = new Error(`editUser fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
};
export const createArticle = async (articleData, userToken) => {
  const fetchParams = {
    method: "POST",
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  };
  const responce = await fetch(`${url}articles`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    const error = new Error(`createArticle fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
};
export const editArticle = async (articleData, userToken, slug) => {
  const fetchParams = {
    method: "PUT",
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  };
  const responce = await fetch(`${url}articles/${slug}`, fetchParams)
  if (responce.ok) {
    const data = await responce.json();
    return data;
  } else {
    const error = new Error(`editArticle fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
}
export const deleteArticle = async (userToken, slug) => {
  const fetchParams = {
    method: "DELETE",
    headers: {
      Authorization: `Token ${userToken}`,
      "Content-Type": "application/json",
    },
  };
  
  const responce = await fetch(`${url}articles/${slug}`, fetchParams)
  if (responce.ok) {
    return;
  } else {
    const error = new Error(`deleteArticle fetch failed, ${responce.status}`);
    error.status = responce.status;
    throw error;
  }
}
