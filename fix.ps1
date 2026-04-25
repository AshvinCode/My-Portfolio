$path = "c:\Projects\AI Projects\My-Portfolio\index.html"
$content = Get-Content -Path $path -Raw
$content = $content -replace 'bg-\[#050810\]', 'bg-bgDarker'
$content = $content -replace 'bg-\[#0a0e27\]', 'bg-bgDark'
$content = $content -replace 'text-white', 'text-textPrimary'
$content = $content -replace 'border-white/10', 'border-borderColor'
$content = $content -replace 'border-white/5', 'border-borderColor'
$content = $content -replace 'border-white/20', 'border-borderColor'
$content = $content -replace 'bg-white/5', 'bg-bgCard'
$content = $content -replace 'bg-white/10', 'bg-primary/10'
$content = $content -replace 'Ashvin\.dev', 'Ashvin Mori'
Set-Content -Path $path -Value $content -Encoding UTF8
