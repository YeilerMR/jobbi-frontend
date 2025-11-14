let selectedBranch = null;
export const setSelectedBranchTab = (id) => {
    selectedBranch = id;
}

export const getSelectedBranchTab = () => {
    return selectedBranch;
}