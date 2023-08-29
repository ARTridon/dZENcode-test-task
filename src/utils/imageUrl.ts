"use client"
const { API_URL } = process.env;
export const imageUrl = (url: string) => {
  if (API_URL) {
    return API_URL + url;
  }
};
