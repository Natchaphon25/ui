function handleClick(element) {
    // กำหนด URL ของ API endpoint
    const end_point_url = "http://localhost/api/placeclass";
    // ดึงข้อมูลไฟล์รูปภาพจากอิลิเมนต์ input
    const file = element.files[0];
    // สร้าง FileReader เพื่ออ่านไฟล์รูปภาพ
    const reader = new FileReader();

    // เมื่อไฟล์ถูกอ่านเสร็จสิ้น
    reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        const requestBody = {
            image: base64String
        };
        // ส่งข้อมูลไปยัง API endpoint โดยใช้ fetch API
        fetch(end_point_url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
             // แสดงผลลัพธ์ที่ได้จาก API ลงบนหน้าเว็บ
            const resultElement = document.getElementById('result');
            const placeModel = json["this picture is"];
            resultElement.textContent = `ลักษณะสถานที่: ${placeModel}`;
            
            // แสดงรูปภาพที่เลือกลงบนหน้าเว็บ
            const previewImageElement = document.getElementById('previewImage');
            previewImageElement.src = `data:image/png;base64,${base64String}`;
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
