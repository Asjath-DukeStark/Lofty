
$renames = @(
    @{ Old = "s0.jpg"; New = "skin-care-advice-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s1.jpg"; New = "clean-up-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s2.jpg"; New = "normal-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s3.jpg"; New = "whitening-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s4.jpg"; New = "high-frequency-special-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s5.jpg"; New = "pimple-treatment-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s6.jpg"; New = "acne-treatment-high-frequency-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s7.jpg"; New = "pigmentation-treatment-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s8.jpg"; New = "galvanic-treatment-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s9.jpg"; New = "dark-spot-removal-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s10.jpg"; New = "gold-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s11.jpg"; New = "pearl-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s12.jpg"; New = "silver-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "s13.jpg"; New = "hydra-facial-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h1.jpg"; New = "hair-cutting-all-types-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h2.jpg"; New = "shampoo-conditioner-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h3.jpg"; New = "dandruff-treatment-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h4.jpg"; New = "hot-oil-massage-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h5.jpg"; New = "hair-spa-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h6.jpg"; New = "henna-treatment-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h7.jpg"; New = "hair-coloring-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h8.jpg"; New = "perming-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "h9.jpg"; New = "hair-ironing-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "n1.jpg"; New = "manicure-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "n2.jpg"; New = "pedicure-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "m1.jpg"; New = "normal-makeup-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "m2.jpg"; New = "air-brush-makeup-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "m3.jpg"; New = "mehndi-makeup-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "m4.jpg"; New = "wedding-makeup-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "m5.jpg"; New = "walima-makeup-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "b1.jpg"; New = "rental-bridal-dress-bouquet-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "b2.jpg"; New = "saree-wearing-7-methods-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "b3.jpg"; New = "customised-bouquet-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "b4.jpg"; New = "bridal-car-decoration-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "b5.jpg"; New = "wedding-cake-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "v1.jpg"; New = "marava-box-making-lofty-beauty-parlor-akkaraipattu.jpg" },
    @{ Old = "v2.jpg"; New = "marava-rental-lofty-beauty-parlor-akkaraipattu.jpg" }
)

$basePath = "public\images\new_services"

foreach ($item in $renames) {
    $oldPath = Join-Path $basePath $item.Old
    $newPath = Join-Path $basePath $item.New
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $item.New
        Write-Host "Renamed $($item.Old) to $($item.New)"
    }
    else {
        Write-Warning "File not found: $oldPath"
    }
}
