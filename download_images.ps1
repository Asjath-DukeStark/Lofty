$baseUrl = "https://loremflickr.com/640/480"
$dest = "public\images\new_services"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$images = @{
    "s1"="facial,clean"; "s2"="spa,facial"; "s3"="woman,face"; "s4"="skincare,treatment";
    "s5"="acne,serum"; "s6"="dermatology,face"; "s7"="skin,mask"; "s8"="galvanic,spa";
    "s9"="beauty,skin"; "s10"="gold,luxury"; "s11"="pearl,white"; "s12"="silver,texture";
    "h1"="haircut,salon"; "h2"="shampoo,hair"; "h3"="dandruff,hair"; "h4"="oil,massage";
    "h5"="hair,spa"; "h6"="henna,hair"; "h7"="hair,dye"; "h8"="curly,hair"; "h9"="straight,hair";
    "n1"="manicure,nails"; "n2"="pedicure,feet";
    "m1"="makeup,natural"; "m2"="makeup,artist"; "m3"="henna,hands"; "m4"="bride,makeup"; "m5"="wedding,makeup";
    "b1"="wedding,dress"; "b2"="saree,fashion"; "b3"="bouquet,flowers"; "b4"="wedding,car"; "b5"="wedding,cake";
    "v1"="giftbox,luxury"; "v2"="gift,present"
}

foreach ($key in $images.Keys) {
    $url = "$baseUrl/" + $images[$key] + "/all"
    $outFile = Join-Path $dest "$key.png"
    Write-Host "Downloading $key from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -UserAgent "Mozilla/5.0"
        Start-Sleep -Milliseconds 800
    } catch {
        Write-Error "Failed to download $key"
    }
}
