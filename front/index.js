
const fileForm = document.querySelector("#fileForm")
const linkArea = document.querySelector("#generatedLink")
const fileInput = document.querySelector("#fileInput")

fileForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = fileInput.files[0]

  // get secure url from our server
  const { url } = await fetch("/s3Url").then(res => res.json())
  console.log(url)

  // post the file direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })

 
  
  const fileUrl = url.split('?')[0]
  console.log(fileUrl)
  linkArea.innerHTML=`<a href=${fileUrl}>${fileUrl}</a>`;

  

  // post requst to my server to store any extra data
  
  
  // const img = document.createElement("img")
  // img.src = imageUrl
  // document.body.appendChild(img)
 
})
