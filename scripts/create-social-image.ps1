Add-Type -AssemblyName System.Drawing
$bitmap = [Drawing.Bitmap]::new(1200,630)
$graphics = [Drawing.Graphics]::FromImage($bitmap)
$ink = [Drawing.ColorTranslator]::FromHtml('#0c0c0b')
$bone = [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#eceae4'))
$accent = [Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#ff4f2b'))
$display = [Drawing.Font]::new('Segoe UI Light',58)
$bodyFont = [Drawing.Font]::new('Segoe UI',17)
$label = [Drawing.Font]::new('Segoe UI',11)
try {
  $graphics.SmoothingMode = 'AntiAlias'
  $graphics.TextRenderingHint = 'AntiAliasGridFit'
  $graphics.Clear($ink)
  $graphics.DrawString('Tamim / Robotics & AI', $label, $bone, 38, 32)
  $graphics.DrawString('Karnataka, India', $label, $bone, 1050, 32)
  $graphics.DrawString('I design it.', $display, $bone, 32, 150)
  $graphics.DrawString('I build it.', $display, $bone, 874, 320)
  $graphics.TranslateTransform(445,80)
  $graphics.ScaleTransform(1.32,1.32)
  $logoSvg = [xml](Get-Content -Raw (Join-Path $PSScriptRoot '../public/favicon.svg'))
  foreach ($path in $logoSvg.svg.path) {
    $coords = [regex]::Matches($path.d,'-?\d+') | ForEach-Object { [int]$_.Value }
    $points = for ($i=0; $i -lt $coords.Count; $i+=2) { [Drawing.Point]::new($coords[$i],$coords[$i+1]) }
    $graphics.FillPolygon($bone,[Drawing.Point[]]$points)
  }
  $graphics.ResetTransform()
  $graphics.DrawString('Muhammed Tamim Baig', $bodyFont, $bone, 38, 526)
  $graphics.DrawString('Full-Stack & 3D Systems Builder', $label, $bone, 38, 567)
  $graphics.DrawString('000°', $bodyFont, $accent, 565, 550)
  $bitmap.Save((Join-Path $PSScriptRoot '../public/og-image.png'),[Drawing.Imaging.ImageFormat]::Png)
} finally {
  foreach ($resource in @($label,$display,$bodyFont,$bone,$accent,$graphics,$bitmap)) { $resource.Dispose() }
}
