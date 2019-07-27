/* 
    Lấy danh sách người dùng (từ backend về) 
*/
$(document).ready(function () {
    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();
    ajaxNguoiDung.done(function (result) {
        mangNguoiDung = result;
        //lưu vào local storage
        // localStorage.setItem("DSND", JSON.stringify(mangNguoiDung));
        hienThiNguoiDung(mangNguoiDung);
    }).fail(function (err) {
        console.log(err);
    })
    //js chạy luôn không chờ done và fail => mangNguoiDung = []; (done và fail phải chờ để finish)
    //console.log(mangNguoiDung);
    // hienThiNguoiDung(JSON.parse(localStorage.getItem("DSND")));

    function hienThiNguoiDung(mangHienThi) {
        $("#tblDanhSachNguoiDung").html("");
        var content = "";
        mangHienThi.map(function (nguoidung, index) {
            content += `
        <tr>
            <td>${index}</td>
            <td>${nguoidung.TaiKhoan}</td>
            <td>${nguoidung.MatKhau}</td>
            <td>${nguoidung.HoTen}</td>
            <td>${nguoidung.Email}</td>
            <td>${nguoidung.SoDT}</td>
            <td>
                <button class="btn btn-danger btnXoa" data-id="${nguoidung.TaiKhoan}">Xóa</button>
                <button class="btn btn-info btnSua" data-toggle="modal" data-target="#myModal"
                data-id="${nguoidung.TaiKhoan}"
                data-matkhau="${nguoidung.MatKhau}"
                data-email="${nguoidung.Email}"
                data-sodt="${nguoidung.SoDT}"
                data-maloainguoidung="${nguoidung.MaLoaiNguoiDung}"
                >Sửa</button>
            </td>
        </tr>
        `
        })
        $("#tblDanhSachNguoiDung").html(content);
    }

    $("#btnThemNguoiDung").click(function () {
        $("#modal-title").html("Thêm người dùng");
        var btn = `
            <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
            <button class="btn btn-success" id="btnCapNhat">Cập nhật</button>
        `
        $("#modal-footer").html(btn);
    })

    $("body").delegate("#btnThem", "click", function () {
        //Lay thong tin
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var maLoaiNguoiDung = $("#maLoaiNguoiDung").val();
        //Tao Doi Tuong

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung);

        //Them vao database API
        nguoiDungService.ThemNguoiDung(nguoiDung).done(function () {
            location.reload();
        }).fail(function (err) {
            console.log(err);
        })
    })

    $("body").delegate(".btnXoa", "click", function () {
        var taiKhoan = $(this).data("id");
        nguoiDungService.XoaNguoiDung(taiKhoan).done(function () {
            location.reload();
        }).fail(function (err) {
            console.log(err);
        })
    })

    $("body").delegate(".btnSua", "click", function () {
        $("#TaiKhoan").val($(this).data("id"));
        $("#MatKhau").val($(this).data("matkhau"));
        $("#Email").val($(this).data("email"));
        $("#SoDienThoai").val($(this).data("sodt"));
        $("#maLoaiNguoiDung").val($(this).data("maloainguoidung"));

        $("body").delegate("#btnCapNhat", "click", function () {
            var taiKhoan = $("#TaiKhoan").val();
            var matKhau = $("#MatKhau").val();
            var email = $("#Email").val();
            var soDT = $("#SoDienThoai").val();
            var maLoaiNguoiDung = $("#maLoaiNguoiDung").val();

            nguoiDungService.CapNhatNguoiDung(taiKhoan, matKhau, email, soDT, maLoaiNguoiDung).done(function () {
                location.reload();
            }).fail(function (err) {
                console.log(err);
            })
        })
    })
})