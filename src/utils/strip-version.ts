/**
 * Strips minor component from Onedata version string (eg. 21.02.4 -> 21.02, 25.0 -> 25)
 *
 * @author Jakub Liput
 * @copyright (C) 2024 ACK CYFRONET AGH
 * @copyright (C) 2025 Onedata (onedata.org)
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */

export default function stripVersion(version: string): string {
  const firstNumber = Number(version.split(".")[0]);
  if (firstNumber > 21) {
    return String(firstNumber);
  } else {
    const legacyMatch = version.match(/^\d+\.\d+/);
    if (legacyMatch) {
      return legacyMatch[0];
    } else {
      return version;
    }
  }
}
