#!/usr/bin/env node

const { execSync } = require('child_process');

function parseVersion(versionString) {
  const match = versionString.match(/(\d+)\.(\d+)\.(\d+)/);
  if (match) {
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3])
    };
  }
  return null;
}

function compareVersion(current, required) {
  const currentVersion = parseVersion(current);
  const requiredVersion = parseVersion(required);
  
  if (!currentVersion || !requiredVersion) return false;
  
  if (currentVersion.major > requiredVersion.major) return true;
  if (currentVersion.major < requiredVersion.major) return false;
  if (currentVersion.minor > requiredVersion.minor) return true;
  if (currentVersion.minor < requiredVersion.minor) return false;
  return currentVersion.patch >= requiredVersion.patch;
}

function checkVersion(name, current, required) {
  console.log(`Checking ${name}...`);
  console.log(`  Current: ${current}`);
  console.log(`  Required: ${required}`);
  
  if (compareVersion(current, required)) {
    console.log(`  ✅ ${name} version is compatible\n`);
    return true;
  } else {
    console.log(`  ❌ ${name} version is incompatible\n`);
    return false;
  }
}

function getVersion(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    return null;
  }
}

console.log('🔍 Checking EcoSmart environment compatibility...\n');

// Check Node.js version
const nodeVersion = getVersion('node --version');
const nodeOk = nodeVersion ? checkVersion('Node.js', nodeVersion, '18.0.0') : false;

// Check pnpm version
const pnpmVersion = getVersion('pnpm --version');
const pnpmOk = pnpmVersion ? checkVersion('pnpm', pnpmVersion, '7.0.0') : false;

// Check Docker
const dockerVersion = getVersion('docker --version');
const dockerOk = dockerVersion ? checkVersion('Docker', dockerVersion, '20.0.0') : false;

console.log('📋 Summary:');
console.log(`  Node.js: ${nodeOk ? '✅' : '❌'}`);
console.log(`  pnpm: ${pnpmOk ? '✅' : '❌'}`);
console.log(`  Docker: ${dockerOk ? '✅' : '❌'}`);

if (nodeOk && pnpmOk && dockerOk) {
  console.log('\n🎉 All requirements met! You can run: pnpm install');
  process.exit(0);
} else {
  console.log('\n⚠️  Some requirements are not met. Please install the required versions.');
  console.log('\n💡 Quick fixes:');
  if (!nodeOk) console.log('  - Install Node.js 18+ from https://nodejs.org/');
  if (!pnpmOk) console.log('  - Install pnpm: npm install -g pnpm');
  if (!dockerOk) console.log('  - Install Docker Desktop from https://docker.com/');
  process.exit(1);
}
