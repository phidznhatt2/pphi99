function NguoiDungService() {
    //Lấy danh sách người dùng
    this.LayDanhSachNguoiDung = function () {
        //request
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
        /*         .done(function(result){
                    return result
                }).fail(function(err){
                    console.log(err);
                }) */
    }
    //Thêm người dùng
    this.ThemNguoiDung = function (nguoiDungMoi) {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDungMoi
        })
    }
    //Xóa người dùng
    this.XoaNguoiDung = function (id) {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE"
        })
    }
    //Cập nhật thông tin người dùng
    this.CapNhatNguoiDung = function(taiKhoan, matKhau, email, soDT, maLoaiNguoiDung){
        var ngd = JSON.stringify({TaiKhoan: taiKhoan, MatKhau: matKhau, Email: email, SoDT: soDT, MaLoaiNguoiDung: maLoaiNguoiDung});
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung",
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: ngd
        })
    }
}