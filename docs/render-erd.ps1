Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 1600,1100
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::FromArgb(244,247,251))
$title = New-Object System.Drawing.Font 'Segoe UI',26,([System.Drawing.FontStyle]::Bold)
$head = New-Object System.Drawing.Font 'Segoe UI',18,([System.Drawing.FontStyle]::Bold)
$font = New-Object System.Drawing.Font 'Consolas',14
$small = New-Object System.Drawing.Font 'Segoe UI',13
$dark = [System.Drawing.Brushes]::MidnightBlue
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::SteelBlue),3
$g.DrawString('DATABASE ENTITY RELATIONSHIP DIAGRAM',$title,$dark,45,25)
$g.DrawString('Based on project TypeORM entities | PK = primary key | FK = foreign key | UQ = unique',$small,$dark,48,78)
function Table($x,$y,$name,$rows) {
 $h = 58 + $rows.Count * 34
 $g.FillRectangle([System.Drawing.Brushes]::White,$x,$y,500,$h)
 $g.FillRectangle([System.Drawing.Brushes]::MidnightBlue,$x,$y,500,52)
 $g.DrawString($name,$head,[System.Drawing.Brushes]::White,($x+18),($y+10))
 $g.DrawRectangle($pen,$x,$y,500,$h)
 for($i=0;$i -lt $rows.Count;$i++) { $g.DrawString($rows[$i],$font,$dark,($x+16),($y+61+$i*34)) }
}
Table 60 150 'users' @('PK  id          uuid','    name        varchar(100)','UQ  email       varchar','    password    varchar','    isActive    boolean = true','    role        enum = USER','    createAt    timestamp','    updateAt    timestamp')
Table 1020 150 'orders' @('PK  id          integer','FK  userId      number [see note]','    status      enum = PENDING','    totalAmount float','    createAt    timestamp')
Table 60 620 'products' @('PK  id          integer','    name        varchar','    description varchar NULL','    price       float','    stock       integer = 1','    imageUrl    varchar NULL','    createAt    timestamp','    updateAt    timestamp')
Table 1020 620 'order-Item' @('PK  id          integer','FK  orderId     integer','FK  productId   integer','    quantity    integer','    price       float')
$g.DrawLine($pen,560,260,1020,260)
$g.DrawString('1',$head,$dark,575,225)
$g.DrawString('0..*',$head,$dark,950,225)
$g.DrawString('places',$small,$dark,750,270)
$g.DrawLine($pen,1270,378,1270,620)
$g.DrawString('1',$head,$dark,1285,395)
$g.DrawString('0..*',$head,$dark,1285,575)
$g.DrawString('contains | DELETE CASCADE',$small,$dark,1290,485)
$g.DrawLine($pen,560,735,1020,735)
$g.DrawString('1',$head,$dark,575,700)
$g.DrawString('0..*',$head,$dark,950,700)
$g.DrawString('referenced by',$small,$dark,715,748)
$g.DrawString('DELETE RESTRICT',$small,$dark,705,775)
$g.DrawString('SCHEMA NOTE: orders.userId is declared number, but references users.id (uuid).',$small,[System.Drawing.Brushes]::Firebrick,60,1000)
$g.DrawString('Enums: role = USER | ADMIN; status = PENDING | PAID | FAILED | CANCELED',$small,$dark,60,1035)
$bmp.Save((Join-Path $PWD 'docs/erd.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
