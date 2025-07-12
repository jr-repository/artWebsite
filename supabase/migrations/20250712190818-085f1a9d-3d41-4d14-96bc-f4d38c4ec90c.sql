-- Add new columns to portfolio table for detailed portfolio information
ALTER TABLE portfolio 
ADD COLUMN detailed_description TEXT,
ADD COLUMN gallery_images TEXT[], -- Array of image URLs
ADD COLUMN features TEXT[], -- Array of features/technologies used
ADD COLUMN project_duration TEXT,
ADD COLUMN team_size INTEGER;

-- Update existing portfolios to have empty arrays for new fields
UPDATE portfolio 
SET gallery_images = '{}', 
    features = '{}' 
WHERE gallery_images IS NULL OR features IS NULL;