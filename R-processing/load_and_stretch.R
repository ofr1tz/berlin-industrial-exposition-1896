#' ---
#' title: Load and stretch image
#' output: github_document
#' ---

#+ r options, include = F
knitr::opts_chunk$set(warning = F, message = F, eval = T)

#' This scripts downloads a scanned map of the 1896 Berlin Industrial Exposition
#' from Wikimedia Commons and stretches the raster image values in all layers so
#' that the minimum value is 1. This allows using 0 as value for transparency
#' in the subsequent georeferencing of the image with QGIS.

#+ r requirements
require(here)
require(terra)

#' Download image from wiki commons:
#+ r download
url <- "https://upload.wikimedia.org/wikipedia/commons/6/6f/Berliner_Gewerbeausstellung_1896_02.jpg"
target <- here("data/Berliner_Gewerbeausstellung_1896_02.jpg")
download.file(url, target, mode = "wb")

#' Load raster and stretch to set minimum DN to 1
#' (so that 0 can be used for transparency when georeferencing):
#+ r stretch
rast(target) |>
	stretch(minv = 1) |>
	writeRaster(here("data/berlin-industrial-exposition-1896-stretched.png"))
