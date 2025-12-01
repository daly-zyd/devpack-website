# Script pour telecharger les images des produits

$images = @(
    @{url="http://www.devpack.com.tn/static/media/standard.cf74010e.jpg"; name="standard.jpg"},
    @{url="http://www.devpack.com.tn/static/media/boucherie.2774d45f.webp"; name="boucherie.webp"},
    @{url="http://www.devpack.com.tn/static/media/bio.f99d3789.webp"; name="bio.webp"},
    @{url="http://www.devpack.com.tn/static/media/meat.6db8db8e.webp"; name="meat.webp"},
    @{url="http://www.devpack.com.tn/static/media/datte.796384de.webp"; name="datte.webp"},
    @{url="http://www.devpack.com.tn/static/media/datte_500.ed19ef0b.webp"; name="datte_500.webp"}
)

$outputDir = "public/images/products"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
    Write-Host "Dossier cree" -ForegroundColor Green
}

foreach ($img in $images) {
    $outputPath = Join-Path $outputDir $img.name
    Write-Host "Telechargement de $($img.name)..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $outputPath -ErrorAction Stop
        Write-Host "OK $($img.name) telecharge" -ForegroundColor Green
    } catch {
        Write-Host "Erreur: $_" -ForegroundColor Red
    }
}

Write-Host "Termine!" -ForegroundColor Cyan
