
Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param(
        [string]$SourcePath,
        [string]$DestinationPath,
        [int]$Width,
        [int]$Height
    )

    try {
        $sourceImage = [System.Drawing.Image]::FromFile($SourcePath)
        
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
        $destImage = New-Object System.Drawing.Bitmap($Width, $Height)
        
        $destImage.SetResolution($sourceImage.HorizontalResolution, $sourceImage.VerticalResolution)

        $graphics = [System.Drawing.Graphics]::FromImage($destImage)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

        $wrapMode = New-Object System.Drawing.Imaging.ImageAttributes
        $wrapMode.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
        
        $graphics.DrawImage($sourceImage, $destRect, 0, 0, $sourceImage.Width, $sourceImage.Height, [System.Drawing.GraphicsUnit]::Pixel, $wrapMode)

        $destImage.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        Write-Host "Created $DestinationPath"
    }
    catch {
        Write-Error "Failed to resize image: $_"
    }
    finally {
        if ($sourceImage) { $sourceImage.Dispose() }
        if ($destImage) { $destImage.Dispose() }
        if ($graphics) { $graphics.Dispose() }
    }
}

$source = "public\images\Loty logo.jpeg"
$dest192 = "public\pwa-192x192.png"
$dest512 = "public\pwa-512x512.png"

Resize-Image -SourcePath $source -DestinationPath $dest192 -Width 192 -Height 192
Resize-Image -SourcePath $source -DestinationPath $dest512 -Width 512 -Height 512
