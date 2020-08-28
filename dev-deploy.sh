# build.
npm run build-dev

# change to the deploy directory.
cd dist || exit

# Upload the files.
aws s3 sync --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --delete . "s3://dev.erikoandmikewedding.com/" --profile wedding
aws s3 sync --include "*" --exclude "*.html" --delete . "s3://dev.erikoandmikewedding.com/" --profile wedding

# Invalidate the files in cloudfront.
aws cloudfront create-invalidation --profile wedding --distribution-id EB5MSY5QC9VR0 --paths "/*"
