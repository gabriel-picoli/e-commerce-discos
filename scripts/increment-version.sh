#!/bin/bash
set -e

TYPE=${1:-patch}   # patch, minor, major
TARGET=${2:-all}   # front, back, all
BRANCH=${GITHUB_BASE_REF:-main}

echo "Branch de destino: $BRANCH"
echo "Tipo de incremento: $TYPE"

increment_version() {
  local version=$1
  local type=$2

  IFS='.' read -r major minor patch <<< "$version"

  case "$type" in
    major) major=$((major+1)); minor=0; patch=0 ;;
    minor) minor=$((minor+1)); patch=0 ;;
    patch|*) patch=$((patch+1)) ;;
  esac

  echo "$major.$minor.$patch"
}

# autor do commit
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git fetch origin "$BRANCH"
git checkout "$BRANCH"

# frontend (Node)
if [[ "$TARGET" == "front" || "$TARGET" == "all" ]]; then
  echo "atualizando versão do frontend..."
  PACKAGE_VERSION=$(jq -r .version app/package.json)
  NEW_VERSION_FRONT=$(increment_version "$PACKAGE_VERSION" "$TYPE")
  jq ".version = \"$NEW_VERSION_FRONT\"" app/package.json > tmp.$$.json && mv tmp.$$.json app/package.json
  git add app/package.json
  git commit -m "chore: bump frontend version to $NEW_VERSION_FRONT"
  git tag -a "front-$NEW_VERSION_FRONT" -m "Frontend version $NEW_VERSION_FRONT"
  echo "nova versão frontend: $NEW_VERSION_FRONT"
fi

# backend (PHP)
if [[ "$TARGET" == "back" || "$TARGET" == "all" ]]; then
  echo "atualizando versão do backend..."
  BACK_VERSION=$(jq -r .version backend/composer.json)
  NEW_VERSION_BACK=$(increment_version "$BACK_VERSION" "$TYPE")
  jq ".version = \"$NEW_VERSION_BACK\"" backend/composer.json > tmp.$$.json && mv tmp.$$.json backend/composer.json
  git add backend/composer.json
  git commit -m "chore: bump backend version to $NEW_VERSION_BACK"
  git tag -a "back-$NEW_VERSION_BACK" -m "Backend version $NEW_VERSION_BACK"
  echo "nova versão backend: $NEW_VERSION_BACK"
fi

# push commits e tags
git push origin "$BRANCH" --follow-tags
