function handleClick(element) {
    const end_point_url = "http://localhost/api/brandofcar";
    const file = element.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const base64String = reader.result;

        fetch(end_point_url, {
            method: "POST",
            body: JSON.stringify({ image_str: base64String }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
            const resultElement = document.getElementById('result');
            const carModel = json["Brand of this car is"];
            resultElement.textContent = `ยี่ห้อรถยนต์: ${carModel}`;

            const previewImageElement = document.getElementById('previewImage');
            previewImageElement.src = base64String;
        });
    };

    reader.readAsDataURL(file);
}
/* ... ส่วนอื่น ๆ ใน script.js ... */

// เพิ่มฟังก์ชันสำหรับการลากและวางรูปภาพ
function handleDragOver(event) {
    event.preventDefault();
    const dropArea = document.querySelector('.drop-area');
    dropArea.classList.add('active');
}

function handleDragLeave(event) {
    event.preventDefault();
    const dropArea = document.querySelector('.drop-area');
    dropArea.classList.remove('active');
}

function handleDrop(event) {
    event.preventDefault();
    const dropArea = document.querySelector('.drop-area');
    dropArea.classList.remove('active');

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('fileInput');
        fileInput.files = files;
        handleClick(fileInput);
    }
}
