#!/bin/bash
set -e

#calc short sha
calculatedSha=$(git rev-parse --short $gh_id)
echo "COMMIT_SHORT_SHA=$calculatedSha" >> $GITHUB_ENV

#remove linebreaks
STAGE1=$(echo $gh_msg | tr -d '\n')
#echo "stage1"
#echo $STAGE1

#remove whitespaces
STAGE2=${STAGE1// /_}
#echo "stage2"
#echo $STAGE2

CONCAT_MSG_TMP=$(echo "$calculatedSha-$STAGE2")
#echo  $CONCAT_MSG_TMP
echo "CONCAT_MSG=$(echo $CONCAT_MSG_TMP | cut -c 1-512)" >> $GITHUB_ENV