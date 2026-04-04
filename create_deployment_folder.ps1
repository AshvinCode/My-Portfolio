$sourceBase = $PSScriptRoot
$deploymentFolder = Join-Path (Split-Path $sourceBase -Parent) "Portfolio_Ready_To_Deploy"

Write-Host "Creating deployment folder at: $deploymentFolder" -ForegroundColor Cyan

# Create the new clean folder (or empty it if it exists)
if (Test-Path $deploymentFolder) {
    Remove-Item -Path "$deploymentFolder\*" -Recurse -Force
} else {
    New-Item -ItemType Directory -Force -Path $deploymentFolder | Out-Null
}

$filesToCopy = @(
    "index.html",
    "style.css",
    "script.js",
    "ashvin-logo.png"
)

$foldersToCopy = @(
    "img",
    "resume"
)

# Copy Files
foreach ($file in $filesToCopy) {
    $sourceFile = Join-Path $sourceBase $file
    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $deploymentFolder
        Write-Host "Copied $file" -ForegroundColor Green
    }
}

# Copy Folders
foreach ($folder in $foldersToCopy) {
    $sourceFolder = Join-Path $sourceBase $folder
    if (Test-Path $sourceFolder) {
        Copy-Item -Path $sourceFolder -Destination (Join-Path $deploymentFolder $folder) -Recurse -Force
        Write-Host "Copied $folder folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Yellow
Write-Host "SUCCESS! Your clean deployment folder is ready at:" -ForegroundColor Yellow
Write-Host $deploymentFolder -ForegroundColor White
Write-Host "You can now safely drag and drop THIS folder into Netlify or upload it to GitHub!" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Yellow
